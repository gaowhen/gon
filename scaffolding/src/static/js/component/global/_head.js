import Search from 'js/component/global/_search'
import getDevice from 'js/util/_device'
import { getNewsList } from 'js/util/_api'

const LANG = {
  title: {
    cn: '票房分析',
    en: '票房分析',
  },
  boxoffice: {
    cn: '实时大盘',
    en: 'Box Office',
  },
  map: {
    cn: '直播全国',
    en: 'Ticket Live',
  },
  news: {
    cn: '行业资讯',
    en: 'News',
  },
}

class Head extends React.Component {
  constructor(props) {
    super(props)

    const device = getDevice()

    this.state = {
      isShowComing: props.isShowComing,
      isSearchActive: false,
      isShowTop: !device.isApp,
      isShowDot: false,
    }

    this.handleSearch = () => {
      const isSearchActive = !this.state.isSearchActive

      if (isSearchActive) {
        ga('send', 'event', '搜索', 'click', this.props.source, 1)
      }

      this.setState({ isSearchActive })
      fixScroll(isSearchActive)
    }

    const lastTime = localStorage.getItem(window.LastTimeViewdNews)

    getNewsList()
      .then((res) => {
        const time = res.data[0].date
        const isShowDot = !lastTime || time > lastTime

        this.setState({
          isShowDot,
        })
      })
  }

  render() {
    const dot = this.state.isShowDot &&
      <i className="dot"></i>

    const nav = this.state.isShowComing &&
      <div className="bd">
        <ul className="index-tab">
          <li className={this.props.active === 0 ? 'on' : ''}>
            <a href="/">{LANG.boxoffice[window.lang]}</a>
          </li>
          <li className={this.props.active === 1 ? 'on' : ''}>
            <a href="/map">{LANG.map[window.lang]}</a>
          </li>
          <li className={this.props.active === 2 ? 'on' : ''}>
            <a className="nav-news" href="/news">
              {LANG.news[window.lang]}
              {dot}
            </a>
          </li>
        </ul>
      </div>

    const head = (
      <div className="hd">
        <h1>
          <img className="logo" src="{{{img/icon/logo.png}}}" />
          <strong className="title">{LANG.title[window.lang]}</strong>
          <span>piaofang.wepiao.com</span>
        </h1>
        <i
          className="iconfont icon-search"
          onClick={this.handleSearch}
        >
        </i>
      </div>
    )

    return (
      <div className="head-wrap g-c-head">
        <header className="head">
          {head}
          {nav}
        </header>
        <Search
          isActive={this.state.isSearchActive}
          handleCancel={this.handleSearch}
        />
      </div>
    )
  }
}

Head.defaultProps = {
  active: 0,
}

Head.propTypes = {
  source: React.PropTypes.string.isRequired,
  isShowComing: React.PropTypes.bool.isRequired,
  active: React.PropTypes.number,
}

export default Head
