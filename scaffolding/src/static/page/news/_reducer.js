import parseURL from 'js/util/_uri'

import {
  CHANGE_CATEGORY,
  UPDATE_DATA,
  LOAD_MORE,
  CATEGORY,
} from './_const'

let category = CATEGORY.ALL

const uri = parseURL()

if (uri.params.category) {
  category = uri.params.category
}

const initialState = {
  category,
  data: [],
  offset: 0,
}

export default function filter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category,
        offset: 0,
      }
    case UPDATE_DATA:
      return {
        ...state,
        data: action.data,
        offset: action.offset,
      }
    case LOAD_MORE:
      return {
        ...state,
        data: state.data.concat(action.data),
        offset: action.offset,
      }
    default:
      return state
  }
}
