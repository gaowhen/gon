import { debounce } from 'throttle-debounce'

import { getSearchResult } from 'js/util/_api.js'

const LANG = {
  cn: {
    placeholder: '请输入影片或影院名称',
    cancel: '取消',
    movie: '影片名',
    release: '上映年份',
    cinema: '影院名',
    viewer: '观影人次',
    movies: '个相关影片',
    cinemas: '个相关影院',
    keyMovieName: 'movieName',
    keyCinemaName: 'cinemaName',
    empty: '没有搜索到相关内容，换一个试试吧～',
    recent: '搜索历史',
    remove: '清除搜索历史',
  },
  en: {
    placeholder: 'Please input moive or cinema name',
    cancel: 'cancel',
    movie: 'Movie',
    release: 'Release',
    cinema: 'Cinema',
    viewer: 'Viewers',
    movies: 'Movies',
    cinemas: 'Cinemas',
    keyMovieName: 'movieNameEnglish',
    keyCinemaName: 'cinemaNameEnglish',
    empty: 'temporary no data',
    recent: 'Search History',
    remove: 'Remove seardch history',
  },
}

const Lang = LANG[window.lang]

let int = 0
let flag = true
let xhr = null

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: props.isActive,
      height: window.innerHeight - 45,
      placeholder: Lang.placeholder,
      result: {
        cinemaPaging: { total: 0 },
        moviePaging: { total: 0 },
        cinemas: [],
        movies: [],
      },
      recent: localStorage.getArray(window.CachekeySearch),
    }

    const getValue = () => this.refs.keyword.value.trim()

    const fetchResult = () => {
      const keyword = getValue()

      if (!keyword) {
        return
      }

      flag = false
      if (xhr) {
        xhr.abort()
      }

      xhr = getSearchResult(keyword)

      xhr
        .then((result) => {
          ++int
          this.setState({
            placeholder: getValue() ? '' : '请输入影片或影院名称',
            result,
          })
        })
    }

    this.delaySearch = debounce(300, fetchResult)

    this.handleChange = () => this.delaySearch()

    this.handleCancel = () => {
      this.refs.keyword.value = ''

      this.setState({
        placeholder: Lang.placeholder,
        result: {
          cinemaPaging: { total: 0 },
          moviePaging: { total: 0 },
          cinemas: [],
          movies: [],
        },
      })
      this.props.handleCancel()
      flag = true
    }

    this.handleClick = (item, type) => {
      const data = item

      let uri = `/movie?id=${item.movieId}&from=/search`
      data.id = item.movieId

      if (type === 'cinema') {
        uri = `/cinema?id=${item.cinemaId}&from=/search`
        data.id = item.cinemaId
      }

      data.uri = uri
      data.type = type
      localStorage.pushArrayItem(window.CachekeySearch, data, 'id', 10)

      flag = true
      window.location.href = uri
    }

    this.handleRemoveRecent = () => {
      this.setState({
        recent: [],
      })
      localStorage.removeItem(window.CachekeySearch)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      isActive: props.isActive,
    })
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.keyword).focus()
  }

  render() {
    const movies = this.state.result.movies
    const cinemas = this.state.result.cinemas
    const recent = this.state.recent

    const createMovieItem = (item, idx) =>
      <li key={`search-movie-item-${int + idx}-${item.movieId}`}>
        <a
          href={`/movie?id=${item.movieId}&from=/search`}
          onClick={() => this.handleClick(item, 'movie')}
        >
          <h5>{item[Lang.keyMovieName]}</h5>
          <span>{item.releaseYear}</span>
        </a>
      </li>

    const createMovies = movies.length ?
      <div className="movie-wrap">
        <div className="hd">
          <div className="title">
            <span>{Lang.movie}</span>
            <span>{Lang.release}</span>
          </div>
        </div>
        <div className="bd">
          <ul>{movies.map(createMovieItem)}</ul>
        </div>
      </div> : ''

    const createCinemaItem = (item, idx) =>
      <li key={`search-cinema-${int + idx}-${item.cinemaId}`}>
        <a
          href={`/cinema?id=${item.cinemaId}&from=/search`}
          onClick={() => this.handleClick(item, 'cinema')}
        >
          <h5>{item[Lang.keyCinemaName]}</h5>
          <span>{item.productTickets}</span>
        </a>
      </li>

    const createCinemas = cinemas.length ?
      <div className="cinema-wrap">
        <div className="hd">
          <div className="title">
            <span>{Lang.cinema}</span>
            <span>{Lang.viewer}</span>
          </div>
        </div>
        <div className="bd">
          <ul>{cinemas.map(createCinemaItem)}</ul>
        </div>
      </div> : ''

    const createRecentItem = (item, idx) =>
      <li key={`search-recent-${int + idx}-${item.id}`}>
        <a
          href={item.uri}
          onClick={() => this.handleClick(item, item.type)}
        >
          <h5>
            <i className="iconfont icon-duration"></i>
            {item.type === 'cinema' ? item[Lang.keyCinemaName] : item[Lang.keyMovieName]}
          </h5>
        </a>
      </li>

    const createRecent = recent.length ?
      <div className="recent-wrap">
        <div className="hd">
          <div className="title">
            <span>{Lang.recent}</span>
          </div>
        </div>
        <div className="bd">
          <ul>{recent.map(createRecentItem)}</ul>
          <a className="btn-remove" href="#" onClick={this.handleRemoveRecent}>{Lang.remove}</a>
        </div>
      </div> : ''

    const klas = `search-wrap g-c-search ${this.state.isActive ? 'on' : 'hide'}`

    let result = (
      <div className="bd" style={{ height: `${this.state.height}px` }}>
      </div>
    )

    if (!flag) {
      result = (
        <div className="bd" style={{ height: `${this.state.height}px` }}>
          <p className="no-data">{Lang.empty}</p>
        </div>
      )
    }

    if (movies.length || cinemas.length) {
      result = (
        <div className="bd" style={{ height: `${this.state.height}px` }}>
          {createMovies}
          {createCinemas}
        </div>
      )
    }

    if (flag) {
      result = (
        <div className="bd" style={{ height: `${this.state.height}px` }}>
          {createRecent}
        </div>
      )
    }

    return (
      <div className={klas}>
        <div className="hd">
          <div className="input-box">
            <label>
              <i className="iconfont icon-search"></i>
            </label>
            <input
              ref="keyword"
              className="txt-search"
              placeholder={this.state.placeholder}
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <a
            className="btn-cancel"
            onClick={this.handleCancel}
          >
            {Lang.cancel}
          </a>
        </div>
        {result}
      </div>
    )
  }
}

Search.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
}

export default Search
