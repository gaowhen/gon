import { connect } from 'react-redux'

import {
  toggleIndicatorFilter,
  toggleTableGuide,
  changeFilterToUpdate,
} from '../_action'

function mapStateToProps(state) {
  return {
    indicators: state.filters.indicators,
    showIndicatorFilter: state.ui.showIndicatorFilter,
    showTableGuide: state.ui.showTableGuide,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleIndicatorFilter: (isShow) => dispatch(
      toggleIndicatorFilter(isShow)
    ),
    toggleTableGuide: (isShow) => dispatch(
      toggleTableGuide(isShow)
    ),
    changeFilterToUpdate: (filters) => dispatch(changeFilterToUpdate(filters)),
  }
}

export default (c) => connect(mapStateToProps, mapDispatchToProps)(c)
