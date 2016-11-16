import 'js/util/_upload'
import { getNewsList } from 'js/util/_api'

import Filter from './_category'
import List from './_list'

let uploadMovies = null

class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      category: props.category,
      offset: props.offset,
    }

    props.fetchData(this.state.category)
  }

  componentDidMount() {
    const scrollMovies = () => {
      uploadMovies = $('.news-wrap > .bd').dropload({
        loadDownFn: () => {
          getNewsList(this.state.category, this.state.offset)
            .then((res) => {
              if (res.data.length) {
                this.props.loadMore(res.data, res.page.next)
              } else {
                uploadMovies.isData = false
              }

              uploadMovies.resetload()
            })
        },
      })
    }

    scrollMovies()
  }

  componentWillReceiveProps(props) {
    this.setState({
      category: props.category,
      offset: props.offset,
    })
  }

  render() {
    const {
      data,
      category,
      onChangeCategory,
    } = this.props

    return (
      <div className="section">
        <Filter
          category={category}
          onChangeCategory={onChangeCategory}
        />
        <List
          data={data}
          category={category}
          onChangeCategory={onChangeCategory}
        />
      </div>
    )
  }
}

News.propTypes = {
  category: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  offset: React.PropTypes.number.isRequired,
  fetchData: React.PropTypes.func.isRequired,
  loadMore: React.PropTypes.func.isRequired,
  onChangeCategory: React.PropTypes.func.isRequired,
}

export default News
