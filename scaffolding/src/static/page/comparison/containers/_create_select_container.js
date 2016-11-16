import { connect } from 'react-redux'

import {
  getServerData,
  selectItem,
  deleteItem,
} from '../actions/_select'

import { LANG_SELECT } from '../_lang'

function mapStateToProps(state) {
  return {
    LANG_SELECT,
    ...state,
  }
}

function mapDispathToProps(dispatch) {
  return {
    getServerData: (id) => dispatch(getServerData(id)),
    selectItem: (id) => dispatch(selectItem(id)),
    deleteItem: (id) => dispatch(deleteItem(id)),
  }
}

export default function (component) {
  return connect(mapStateToProps, mapDispathToProps)(component)
}
