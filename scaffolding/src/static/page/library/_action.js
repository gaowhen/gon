import { getComingMovie } from 'js/util/_api'

import {
	CHANGE_FILTER,
	UPDATE_DATA,
  LOAD_MORE,
} from './_const'

export function changeFilter(filter, orderBy) {
  return {
    type: CHANGE_FILTER,
    filter,
    orderBy,
  }
}

export function updateData(data) {
  return {
    type: UPDATE_DATA,
    data,
  }
}

export function loadMore(data, page) {
  return {
    type: LOAD_MORE,
    data,
    page,
  }
}

export function fetchData(filter, orderBy) {
  return (dispatch) => {
    getComingMovie(filter, 1, orderBy)
		.then((res) =>
			dispatch(updateData(res.movies))
		)
  }
}

export function changeAndFetch(filter, orderBy) {
  return (dispatch) => {
    dispatch(changeFilter(filter, orderBy))
    dispatch(fetchData(filter, orderBy))
  }
}

export function fetchMore(filter, page, orderBy) {
  return (dispatch) => {
    getComingMovie(filter, page, orderBy)
		.then((res) =>
			dispatch(loadMore(res.movies, page))
		)
  }
}
