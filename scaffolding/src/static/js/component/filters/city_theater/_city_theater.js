import klas from 'classnames'

import getCityName from 'js/util/_city'
import getTheater from 'js/util/_theater'

import Tab from './_tab'

const LANG_CONFIG = {
  cn: {
    city: '全国',
    cityName: 'cityName',
    theaterName: 'nameShort',
  },
  en: {
    city: 'National',
    cityName: 'cityNameEnglish',
    theaterName: 'nameEnglish',
  },
}

const LANG = LANG_CONFIG[window.lang]

class FilterCityTheater extends React.Component {
  constructor(props) {
    super(props)

    const {
      title,
      source,
      isShowTab,
    } = this.props

    this.state = {
      title,
      isShowTab: isShowTab || false,
    }

    this.onClickSwitchTab = () => {
      const isShowTab = !this.state.isShowTab

      this.setState({ isShowTab })

      $('.movie-wrap > .bd').scrollTop(0)
      fixScroll(isShowTab)
      ga('send', 'event', '地区筛选', 'click', source, 1)
    }

    this.onChangeCity = (cityId) => {
      const city = getCityName(cityId)
      const title = city[LANG.cityName]
      const isShowTab = !this.state.isShowTab

      this.setState({
        isShowTab,
        title,
      })

      fixScroll(isShowTab)
      ga('send', 'event', '城市选择', 'click', source, 1)

      this.props.onChangeCity(cityId, title)
    }

    this.onChangeTheater = (theaterId) => {
      const theater = getTheater(theaterId)
      const title = theater[LANG.theaterName]
      const isShowTab = !this.state.isShowTab

      this.setState({
        isShowTab,
        title,
      })

      fixScroll(isShowTab)
      ga('send', 'event', '院线选择', 'click', source, 1)

      this.props.onChangeTheater(theaterId, title)
    }

    this.onClickDocument = (e) => {
      if (this.state.isShowTab && !ReactDOM.findDOMNode(this).contains(e.target)) {
        this.setState({
          isShowTab: false,
        })

        fixScroll(false)
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument, false)
    document.addEventListener('touchend', this.onClickDocument, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument, false)
    document.removeEventListener('touchend', this.onClickDocument, false)
  }

  render() {
    const {
      type,
      source,
      height,
    } = this.props

    const wrapClass = klas('g-c-filter-city-theater', {
      on: this.state.isShowTab,
    })

    return (
      <div className={wrapClass}>
        <div className="hd" onClick={this.onClickSwitchTab}>
          <i className="icon-location"></i>
          <span className="name">{this.state.title}</span>
          <i className="icon-arrow-down"></i>
        </div>
        <div className="bd" style={{ height: `${height}px` }}>
          <Tab
            type={type}
            source={source}
            isShow={this.state.isShowTab}
            onChangeCity={this.onChangeCity}
            onChangeTheater={this.onChangeTheater}
          />
        </div>
      </div>
    )
  }
}

FilterCityTheater.defaultProps = {
  title: LANG.city,
  height: window.innerHeight,
}

FilterCityTheater.propTypes = {
  source: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  isShowTab: React.PropTypes.bool,
  onChangeCity: React.PropTypes.func.isRequired,
  onChangeTheater: React.PropTypes.func.isRequired,
}

export default FilterCityTheater
