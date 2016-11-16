import { connect } from 'react-redux'

import News from './component/_news'

import {
  changeAndFetch,
  fetchData,
  loadMore,
} from './_action'

const mapStateToProps = (state) =>
  ({
    category: state.category,
    data: state.data,
    offset: state.offset,
  })

const mapDispatchToProps = (dispatch) =>
  ({
    onChangeCategory: (category) => {
      dispatch(changeAndFetch(category))
    },
    fetchData: (category) => {
      dispatch(fetchData(category))
    },
    loadMore: (category, offset) => {
      dispatch(loadMore(category, offset))
    },
  })

const NewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(News)

export default NewsContainer
