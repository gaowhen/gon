import { getComparisonMovie } from 'js/util/_api'
import { getDateDiff } from 'js/util/_date'

import * as TYPES from '../_constant'

export const updateData = (data, tab) => ({
  type: TYPES.updateData,
  payload: { data, tab },
})

export const updateFilter = (filter, tab) => ({
  type: TYPES.updateFilter,
  payload: { ...filter, tab },
})

export const getServerData = (ids, tab) => (dispatch, getState) => {
  const state = getState()
  const date = state[tab].date
  const endDate = state[tab].endDate
  const duration = getDateDiff(date, endDate)

  const params = {
    date: endDate,
    duration: Math.abs(duration) + 1,
  }

  const getData = (ids) => {
    getComparisonMovie(ids, params)
    .then((res) => {
      window.loading.hide()

      res.data && dispatch(updateData(res.data, tab))
    })
  }

  getData(ids)
}

export const changeDateAndFetchData = (ids, filter, tab) => (dispatch) => {
  dispatch(updateFilter(filter, tab))
  dispatch(getServerData(ids, tab))
}
