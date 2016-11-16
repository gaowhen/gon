import { getBoxoffice, getIndexTrend } from 'js/util/_api'
import { dateDiff } from 'js/util/_date'
import getDevice from 'js/util/_device'
import { connectWebViewBridge } from 'js/util/_client'

import { TYPES } from './_constant'

let timeout
let trendTimeout
let xhr = null
let trendXhr = null
let isSocketRegistered = false
let isSocketOpen = false
let isSocketWork = true
let socketID
let prevDate

const device = getDevice()

export function changeFilter(filter) {
  return {
    type: TYPES.changeFilter,
    payload: { ...filter },
  }
}

export function updateData(data) {
  return {
    type: TYPES.updateData,
    payload: { ...data },
  }
}

export function clearTimeInterval() {
  window.clearTimeout(timeout)
  window.clearTimeout(trendTimeout)

  timeout = null
  trendTimeout = null
}

function getTrendFromHttp(date, dispatch) {
  if (trendXhr) {
    trendXhr.abort()
  }

  // 需要先清除旧的 xhr，再判断是否能请求新的数据
  if (dateDiff(date) < 0) {
    return
  }

  trendXhr = getIndexTrend(date)
  trendXhr.then((res) => {
    window.clearTimeout(trendTimeout)
    trendTimeout = null

    if (res.data) {
      const data = res.data
      dispatch(updateData({
        trend: {
          boxoffice: data.boxoffice,
          date: data.date,
        },
        accuracy: data.accuracy,
      }))

      if (dateDiff(date) === 0) {
        trendTimeout = setTimeout(() => getTrendFromHttp(date, dispatch), 30 * 60 * 1000)
      }
    }
  })
}

function getTrendData() {
  return (dispatch, getState) => {
    const state = getState()
    const date = state.filters.date

    getTrendFromHttp(date, dispatch)
  }
}

function getDataFromHttp(date, filters, dispatch) {
  if (xhr) {
    xhr.abort()
  }
  xhr = getBoxoffice(date, filters)
  xhr.then((res) => {
    window.clearTimeout(timeout)
    timeout = null

    dispatch(updateData({
      boxoffice: res.nationalBoxOfficeRef,
      movies: res.movieBoxOffices,
    }))

    // 今天及以后的数据才会实时更新
    if (dateDiff(date) <= 0) {
      timeout = setTimeout(() => getDataFromHttp(date, filters, dispatch), 4 * 1000)
    }
  })
}

let params
function getDataFromWS() {
  const data = {
    handleName: 'request',
    data: params,
    socketID,
  }

  window.WebViewJavascriptBridge.callHandler('socketRequest', data)
}

export function updateDataFromServer() {
  return (dispatch, getState) => {
    const filters = getState().filters
    const date = filters.date
    if (prevDate !== date) {
      dispatch(getTrendData())
    }

    prevDate = date

    // TODO 确定 WebSocket 版本号
    if (isSocketWork && device.isApp && device.platform === 'iOS' && Number(device.version) > 3) {
      const indicators = {
        boxofficeRate: 'productBoxOfficeRate',
        scheduleRate: 'productScheduleRate',
        seatRate: 'productTicketSeatRate',
        showTimes: 'productShowTimes',
        ticketSeatRate: 'productSeatsRate',
        avgPrice: 'productAvgPrice',
        avgPerson: 'productAvgPerson',
        tickets: 'productTickets',
      }

      params = {
        lang: window.lang,
        movieFilter: {
          scheduleDate: `${date} 00:00:00`,
          sortColumn: indicators[filters.sortBy],
          sortType: 'desc',
        },
        paging: {
          pageSize: '15',
        },
      }

      connectWebViewBridge(() => {
        if (isSocketOpen) {
          getDataFromWS()
        } else {
          window.WebViewJavascriptBridge.callHandler('openSocket', {
            socketURL: 'ws://10.3.10.101/ws',
          }, (data) => {
            socketID = data.socketID
          })
        }

        if (!isSocketRegistered) {
          isSocketRegistered = true

          window.WebViewJavascriptBridge.registerHandler('socketData', (data) => {
            const d = JSON.parse(data)

            if (d.socketID !== socketID) {
              return
            }

            // 如果之前 socket 中断过，重新监听时需要清除 JS 轮询
            if (!isSocketWork) {
              if (xhr) {
                xhr.abort()
              }

              if (timeout) {
                clearTimeInterval()
              }

              isSocketWork = true
            }


            dispatch(updateData({
              boxoffice: d.data.nationalBoxOfficeRef,
              movies: d.data.movieBoxOffices,
            }))
          })

          // socket open 请求失败
          window.WebViewJavascriptBridge.registerHandler('socketOpenFailed', (data) => {
            const d = JSON.parse(data)
            if (d.socketID !== socketID) {
              return
            }

            const filters = getState().filters
            const date = filters.date
            isSocketOpen = false
            isSocketWork = false
            getDataFromHttp(date, filters, dispatch)
          })

          // socket open 请求成功
          window.WebViewJavascriptBridge.registerHandler('socketOpenSuccess', (data) => {
            const d = JSON.parse(data)
            if (d.socketID !== socketID) {
              return
            }

            isSocketOpen = true
            isSocketWork = true
            getDataFromWS()
          })

          // socket 断开连接
          window.WebViewJavascriptBridge.registerHandler('socketFailed', (data) => {
            const d = JSON.parse(data)
            if (d.socketID !== socketID) {
              return
            }

            const filters = getState().filters
            const date = filters.date
            isSocketWork = false
            getDataFromHttp(date, filters, dispatch)
          })
        }
      })
    } else {
      if (timeout) {
        clearTimeInterval()
      }

      getDataFromHttp(date, filters, dispatch)
    }
  }
}

export function toggleIndicatorFilter(showIndicatorFilter) {
  return (dispatch) => {
    dispatch({
      type: TYPES.toggleIndicatorFilter,
      payload: { showIndicatorFilter },
    })

    if (showIndicatorFilter) {
      window.fixScroll(true)
    } else {
      window.fixScroll(false)
    }
  }
}

export function toggleTableGuide(showTableGuide) {
  return (dispatch) => {
    dispatch({
      type: TYPES.toggleTableGuide,
      payload: { showTableGuide },
    })

    localStorage.setItem('indexMovieDataGuide', true)
  }
}

export function changeFilterToUpdate(filter) {
  return (dispatch) => {
    dispatch(changeFilter(filter))

    dispatch(updateDataFromServer())
  }
}
