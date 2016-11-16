import { TYPES } from '../_constant'

const initialState = {
  movies: [],
  boxoffice: [0, 0],
  trend: {
    boxoffice: [],
    date: [],
  },
  accuracy: '-',
}

export default function data(state = initialState, action) {
  switch (action.type) {
    case TYPES.updateData:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
