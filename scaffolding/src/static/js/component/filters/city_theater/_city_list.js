import klas from 'classnames'

import CITY from 'js/const/_city'

const LANG_CONFIG = {
  cn: {
    RECENT: '最近访问',
    REGION: '区域',
    HOT: '热门',
    cityName: 'cityName',
  },
  en: {
    RECENT: 'Recent Visit',
    REGION: 'Region',
    HOT: 'Hot Cities',
    cityName: 'cityNameEnglish',
  },
}
const LANG = LANG_CONFIG[window.lang]

class CityList extends React.Component {
  constructor(props) {
    super(props)

    const recent = localStorage.getArray('recentCities')

    this.state = {
      recent,
    }

    this.onChangeCity = (city) => {
      const id = city.cityId.split(',')

      localStorage.pushArrayItem('recentCities', city, 'cityId')

      this.setState({
        recent: localStorage.getArray('recentCities'),
      })

      this.props.onChangeCity(id)
    }
  }

  createItem = (item, idx) =>
    (
      <li
        className="city-item"
        key={`city-item-${idx}`}
        onClick={() => this.onChangeCity(item)}
      >
        {item[LANG.cityName]}
      </li>
    )

  renderRecent() {
    if (this.state.recent.length) {
      return (
        <div className="city-section" key="recent">
          <div className="hd">
            <h3>{LANG.RECENT}</h3>
          </div>
          <div className="bd">
            <ul>{this.state.recent.map(this.createItem)}</ul>
          </div>
        </div>
      )
    }

    return null
  }

  renderSection() {
    const createSection = (item) => (
        <div className="city-section" key={item}>
          <div className="hd">
            <h3>{LANG[item] ? LANG[item] : item}</h3>
          </div>
          <div className="bd">
            <ul>{CITY[item].map(this.createItem)}</ul>
          </div>
        </div>
      )

    return Object.keys(CITY).map(createSection)
  }

  render() {
    const {
      isShow,
    } = this.props

    const wrapClass = klas('city-list-wrap', {
      hide: !isShow,
    })

    return (
      <div className={wrapClass}>
        {this.renderRecent()}
        {this.renderSection()}
      </div>
    )
  }
}

CityList.defaultProps = {
  isShowOtherCity: false,
}

CityList.propTypes = {
  isShow: React.PropTypes.bool.isRequired,
  onChangeCity: React.PropTypes.func.isRequired,
}

export default CityList
