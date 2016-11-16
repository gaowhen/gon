import * as TYPES from '../_constant'

const initialState = {
  mainItem: {},
  items: [],
  selectedItems: [],
  date: '',
  endDate: '',
}

export default function data(state = initialState, action) {
  const payload = action.payload

  switch (action.type) {
    case TYPES.updateData:
      if (payload.mainItem.showDay && (!state.date || !state.endDate)) {
        const showDay = payload.mainItem.showDay
        let date
        let endDate

        const releaseDate = Gon.formatDate(Gon.today, { offset: 1 - showDay })
        if (showDay > 7) {
          date = releaseDate
          endDate = Gon.formatDate(date, { offset: showDay > 30 ? 29 : showDay - 1 })
        } else if (showDay > 0) {
          date = Gon.formatDate(releaseDate, { offset: showDay - 6 })
          endDate = Gon.formatDate(releaseDate, { offset: showDay })
        } else {
          date = Gon.formatDate(Gon.today, { offset: -6 })
          endDate = Gon.formatDate(Gon.today)
        }

        return {
          ...state,
          date,
          endDate,
          mainItem: payload.mainItem,
          items: payload.items,
        }
      }

      return {
        ...state,
        mainItem: payload.mainItem,
        items: payload.items,
      }

    case TYPES.selectItem:
    case TYPES.deleteItem:
      return {
        ...state,
        items: payload.items,
        selectedItems: payload.selectedItems,
      }

    default:
      return state
  }
}
