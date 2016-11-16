import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    movies: state.data.movies,
  }
}

export default (c) => connect(mapStateToProps)(c)
