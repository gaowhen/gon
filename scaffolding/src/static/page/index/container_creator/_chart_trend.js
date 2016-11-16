import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    date: state.filters.date,
    trend: state.data.trend,
    accuracy: state.data.accuracy,
  }
}

export default (c) => connect(mapStateToProps)(c)
