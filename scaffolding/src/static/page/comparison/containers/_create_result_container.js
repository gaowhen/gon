import { connect } from 'react-redux'

import {
  getServerData,
  changeDateAndFetchData,
} from '../actions/_result'

import { LANG_RESULT } from '../_lang'

function mapStateToProps(state) {
  return {
    LANG_RESULT,
    ...state,
  }
}

function mapDispathToProps(dispatch) {
  return {
    getServerData: (ids, tab) => dispatch(getServerData(ids, tab)),
    changeDateAndFetchData: (ids, filter, tab) =>
      dispatch(changeDateAndFetchData(ids, filter, tab)),
  }
}

export default function (component) {
  return connect(mapStateToProps, mapDispathToProps)(component)
}
