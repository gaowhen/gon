import { connect } from 'react-redux'

import {
  changeFilterToUpdate,
  toggleIndicatorFilter,
} from '../_action'

function mapStateToProps(state) {
  return {
    date: state.filters.date,
    indicators: state.filters.indicators,
    sortBy: state.filters.sortBy,
    boxoffice: state.data.boxoffice,
    movies: state.data.movies,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleReorder: (sortBy) => dispatch(changeFilterToUpdate({ sortBy })),
    onClickMore: (isShow) => dispatch(toggleIndicatorFilter(isShow)),
  }
}

export default (c) => connect(mapStateToProps, mapDispatchToProps)(c)
