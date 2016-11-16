import 'js/util/_upload'
import { getComingMovie } from 'js/util/_api'

import Filter from './_filter'
import MovieList from '../component/_movie_list'

const LANG = {
  cn: {
    title: '即将上映',
  },
  en: {
    title: 'Release Soon',
  },
}

const Lang = LANG[window.lang]
let uploadMovies = null

class Soon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: props.filter,
      page: props.page,
      orderBy: props.orderBy,
    }

    props.fetchData(props.filter, props.page, props.orderBy)
  }

  componentDidMount() {
    const scrollMovies = () => {
      uploadMovies = $('.library-wrap > .bd').dropload({
        loadDownFn: () => {
          getComingMovie(this.state.filter, this.state.page + 1, this.state.orderBy)
            .then((res) => {
              if (res.movies.length) {
                this.props.loadMore(res.movies, res.paging.page, this.state.orderBy)
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
      filter: props.filter,
      page: props.page,
      orderBy: props.orderBy,
    })
  }

  render() {
    return (
      <div className="soon">
        <div className="hd">
          <Filter
            filter={this.props.filter}
            onClick={this.props.onClick}
          />
          <h3>{Lang.title}</h3>
        </div>
        <div className="bd">
          <MovieList
            data={this.props.data}
          />
        </div>
      </div>
    )
  }
}

Soon.propTypes = {
  filter: React.PropTypes.string.isRequired,
  orderBy: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  page: React.PropTypes.number.isRequired,
  fetchData: React.PropTypes.func.isRequired,
  loadMore: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

export default Soon
