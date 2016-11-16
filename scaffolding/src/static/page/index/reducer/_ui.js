import { TYPES } from '../_constant'

const initialState = {
  showIndicatorFilter: false,
  showTableGuide: false,
}

export default function ui(state = initialState, action) {
  switch (action.type) {
    case TYPES.toggleIndicatorFilter:
      return {
        ...state,
        ...action.payload,
      }

    case TYPES.toggleTableGuide:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
