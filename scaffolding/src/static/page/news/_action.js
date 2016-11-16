import { getNewsList } from 'js/util/_api'

import {
	CHANGE_CATEGORY,
	UPDATE_DATA,
  LOAD_MORE,
} from './_const'

export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category,
  }
}

export function updateData(data, offset) {
  return {
    type: UPDATE_DATA,
    data,
    offset,
  }
}

export function loadMore(data, offset) {
  return {
    type: LOAD_MORE,
    data,
    offset,
  }
}

export function fetchData(category) {
  return (dispatch) => {
    getNewsList(category)
    .then((res) => {
      localStorage.setItem(window.LastTimeViewdNews, res.data[0].date)
      dispatch(updateData(res.data, res.page.next))
    })
  }
}

export function changeAndFetch(category) {
  return (dispatch) => {
    dispatch(changeCategory(category))
    dispatch(fetchData(category))
  }
}
