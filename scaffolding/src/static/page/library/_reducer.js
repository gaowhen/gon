import {
	UPDATE_DATA,
	CHANGE_FILTER,
  LOAD_MORE,
	Filter,
} from '../library/_const'

const initialState = {
  filter: Filter.BY_DATE,
  data: [],
  page: 1,
  orderBy: 'asce',
}

export default function filter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.filter,
        page: 1,
        orderBy: action.orderBy,
      }
    case UPDATE_DATA:
      return {
        ...state,
        data: action.data,
      }
    case LOAD_MORE:
      return {
        ...state,
        data: state.data.concat(action.data),
        page: action.page,
      }
    default:
      return state
  }
}
