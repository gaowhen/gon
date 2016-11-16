import { connect } from 'react-redux'

import Soon from '../component/_soon'

import {
  changeAndFetch,
  fetchData,
  loadMore,
} from '../_action'

const mapStateToProps = (state) =>
  ({
    filter: state.filter,
    data: state.data,
    page: state.page,
    orderBy: state.orderBy,
  })

const mapDispatchToProps = (dispatch) =>
  ({
    onClick: (filter, orderBy) => {
      dispatch(changeAndFetch(filter, orderBy))
    },
    fetchData: (filter, orderBy) => {
      dispatch(fetchData(filter, orderBy))
    },
    loadMore: (filter, page, orderBy) => {
      dispatch(loadMore(filter, page, orderBy))
    },
  })

const SoonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Soon)

export default SoonContainer
