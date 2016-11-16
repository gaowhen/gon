import klas from 'classnames'

import CityList from './_city_list'
import TheaterList from './_theater_list'

const LANG_CONFIG = {
  cn: {
    city: '按城市',
    theater: '按院线',
  },
  en: {
    city: 'City',
    theater: 'Theater',
  },
}
const LANG = LANG_CONFIG[window.lang]

class Tab extends React.Component {
  constructor(props) {
    super(props)

    const {
      type,
      source,
    } = props

    const isTheaterShow = type === 'theater'
    this.state = {
      isCityShow: !isTheaterShow,
      isTheaterShow,
      active: 0,
    }

    this.onClickSwitchToCity = () => {
      this.setState({
        isCityShow: true,
        isTheaterShow: false,
        active: 0,
      })

      ga('send', 'event', '城市TAB', 'click', source, 1)
    }

    this.onClickSwitchToTheater = () => {
      this.setState({
        isCityShow: false,
        isTheaterShow: true,
        active: 1,
      })

      ga('send', 'event', '院线TAB', 'click', source, 1)
    }
  }

  renderHead() {
    const {
      type,
    } = this.props

    if (type === 'all') {
      return (
        <div className="hd">
          <span
            className={`tab-btn${this.state.active === 0 ? ' on' : ''}`}
            onClick={this.onClickSwitchToCity}
          >
            {LANG.city}
          </span>
          <span
            className={`tab-btn${this.state.active === 1 ? ' on' : ''}`}
            onClick={this.onClickSwitchToTheater}
          >
            {LANG.theater}
          </span>
        </div>
      )
    }

    return null
  }

  render() {
    const {
      isShow,
      isShowOtherCity,
      isShowNationTheater,
      onChangeCity,
      onChangeTheater,
    } = this.props

    const wrapClass = klas('tab-wrap', {
      hide: !isShow,
    })

    return (
      <div className={wrapClass}>
        {this.renderHead()}
        <div className="bd">
          <CityList
            isShow={this.state.isCityShow}
            isShowOtherCity={isShowOtherCity}
            onChangeCity={onChangeCity}
          />
          <TheaterList
            isShow={this.state.isTheaterShow}
            isShowNationTheater={isShowNationTheater}
            onChangeTheater={onChangeTheater}
          />
        </div>
      </div>
    )
  }
}

Tab.defaultProps = {
  type: 'all',
}

Tab.propTypes = {
  isShow: React.PropTypes.bool.isRequired,
  source: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  isShowOtherCity: React.PropTypes.bool,
  isShowNationTheater: React.PropTypes.bool,
  onChangeCity: React.PropTypes.func.isRequired,
  onChangeTheater: React.PropTypes.func.isRequired,
}

export default Tab
