import { TYPES } from '../_constant'

const cacheDate = sessionStorage.getItem(window.IndexCachekeyFilterDate)
let cacheSortBy = sessionStorage.getItem(window.IndexCachekeyFilterSortBy)
let cacheIndicators = JSON.parse(sessionStorage.getItem(window.IndexCachekeyFilterIndicator))

if (cacheIndicators) {
  const hasBoxofficeKey = 'boxoffice' in cacheIndicators
  if (!hasBoxofficeKey) {
    cacheIndicators = null
    cacheSortBy = null
  }
}

const initialState = {
  date: cacheDate || Gon.today,
  sortBy: cacheSortBy || 'boxoffice',
  indicators: cacheIndicators || {
    boxoffice: true,
    boxofficeRate: true,
    scheduleRate: true,
    seatRate: true,
    showTimes: false,
    ticketSeatRate: false,
    avgPrice: false,
    avgPerson: false,
    tickets: false,
  },
}

export default function filters(state = initialState, action) {
  switch (action.type) {
    case TYPES.changeFilter:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
