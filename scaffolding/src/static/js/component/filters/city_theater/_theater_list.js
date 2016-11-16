import klas from 'classnames'

import THEATER from 'js/const/_theater'

const LANG_CONFIG = {
  cn: {
    recent: '最近访问',
    nation: '全国院线',
    hot: '热门院线',
    all: '院线',
    theaterName: 'nameShort',
  },
  en: {
    recent: 'Recent Visit',
    nation: 'Nation',
    hot: 'Hot',
    all: 'All',
    theaterName: 'nameEnglish',
  },
}
const LANG = LANG_CONFIG[window.lang]

class TheaterList extends React.Component {
  constructor(props) {
    super(props)

    const recent = localStorage.getArray('recentTheaters')

    this.state = {
      recent,
    }

    this.onChangeTheater = (theater) => {
      localStorage.pushArrayItem('recentTheaters', theater)

      this.setState({
        recent: localStorage.getArray('recentTheaters'),
      })

      this.props.onChangeTheater(theater.id)
    }
  }

  createItem = (item, idx) => (
    <li
      className="theater-item"
      key={`theater-item-${idx}`}
      onClick={() => this.onChangeTheater(item)}
    >
      {item[LANG.theaterName]}
    </li>
  )

  renderRecent() {
    if (this.state.recent.length) {
      return (
        <div className="theater-section" key="recent">
          <div className="hd">
            <h3>{LANG.recent}</h3>
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
    const createSection = (item) =>
      (
        <div
          className="theater-section"
          key={item}
        >
          <div className="hd">
            <h3>{LANG[item] ? LANG[item] : item}</h3>
          </div>
          <div className="bd">
            <ul>{THEATER[item].map(this.createItem)}</ul>
          </div>
        </div>
      )

    return Object.keys(THEATER).map(createSection)
  }

  render() {
    const {
      isShow,
    } = this.props

    const wrapClass = klas('theater-list-wrap', {
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

TheaterList.defaultProps = {
  isShowNation: false,
}

TheaterList.propTypes = {
  isShow: React.PropTypes.bool.isRequired,
  isShowNation: React.PropTypes.bool,
  onChangeTheater: React.PropTypes.func.isRequired,
}

export default TheaterList
