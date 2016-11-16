import parseURL from 'js/util/_uri'

import * as TYPES from '../_constant'

const url = parseURL(window.location)
const params = url.params
const date = params.date || Gon.formatDate(new Gon.Date(Gon.yesterday) - 6 * 24 * 60 * 60 * 1000)
const endDate = params.endDate || Gon.yesterday

const initialState = {
  boxoffice: {
    data: [],
    date,
    endDate,
  },
  showtime: {
    data: [],
    date,
    endDate,
  },
}

export default function data(state = initialState, action) {
  const payload = action.payload
  const tab = payload && payload.tab
  payload && delete payload.tab

  switch (action.type) {
    case TYPES.updateData:

      return {
        ...state,
        [tab]: {
          ...state[tab],
          ...payload,
        },
      }

    case TYPES.updateFilter:
      return {
        ...state,
        [tab]: {
          ...state[tab],
          ...payload,
        },
      }

    default:
      return state
  }
}
