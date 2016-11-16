import { getMoviesSameSchedule } from 'js/util/_api'
import showTip from 'js/util/_tip'

import { LANG_SELECT } from '../_lang'

import * as TYPES from '../_constant'

export const updateData = (data) => ({
  type: TYPES.updateData,
  payload: { mainItem: data[0], items: data.splice(1) },
})

export const getServerData = (id, type = 'movie') => (dispatch) => {
  const getData = (id) => {
    let requestServerData
    if (type === 'movie') {
      requestServerData = getMoviesSameSchedule
    }

    requestServerData(id)
    .then((res) => {
      window.loading.hide()

      res.data && dispatch(updateData(res.data))
    })
  }

  getData(id)
}

export const selectItem = (id, maxNumber = 4) => (dispatch, getState) => {
  const state = getState()

  let newItems
  const selectedItems = [...state.selectedItems]
  if (state.selectedItems.length < (maxNumber - 1)) {
    newItems = [...state.items]
    for (const item of newItems) {
      if (item.id === id) {
        item.isSelected = true
        selectedItems.push(item)
        break
      }
    }
  } else {
    showTip(LANG_SELECT.SelectList.tip)
    return
  }

  dispatch({
    type: TYPES.selectItem,
    payload: { items: newItems, selectedItems },
  })
}

export const deleteItem = (id) => (dispatch, getState) => {
  const state = getState()

  const newItems = [...state.items]
  const selectedItems = [...state.selectedItems]
  for (const item of newItems) {
    if (item.id === id) {
      item.isSelected = false
      const idx = selectedItems.indexOf(item)
      selectedItems.splice(idx, 1)
      break
    }
  }

  dispatch({
    type: TYPES.deleteItem,
    payload: { items: newItems, selectedItems },
  })
}
