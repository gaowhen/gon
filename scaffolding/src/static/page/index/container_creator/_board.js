import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    date: state.filters.date,
    boxoffice: state.data.boxoffice,
  }
}

export default (c) => connect(mapStateToProps)(c)
