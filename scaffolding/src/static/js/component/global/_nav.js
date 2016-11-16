import getDevice from 'js/util/_device'

const LANG = {
  boxoffice: {
    cn: '票房',
    en: 'Bookoffice',
  },
  booking: {
    cn: '排片',
    en: 'Booking',
  },
  cinema: {
    cn: '影院',
    en: 'Cinema',
  },
  library: {
    cn: '影库',
    en: 'Record',
  },
  mine: {
    cn: '我的',
    en: 'me',
  },
}

const navs = [
  {
    title: 'boxoffice',
    icon: 'icon-boxoffice',
    link: '/',
    text: '',
  },
  {
    title: 'booking',
    icon: 'icon-schedule',
    link: '/booking',
    text: '',
  },
  {
    title: 'cinema',
    icon: 'icon-cinema',
    link: '/cinemas',
    text: '',
  },
  {
    title: 'library',
    icon: 'icon-library',
    link: '/library',
    text: '',
  },
  {
    title: 'mine',
    icon: 'icon-mine',
    link: '/mine',
    text: '',
  },
]

function getNavs() {
  return navs.map((item) => {
    const _item = item
    _item.text = LANG[item.title][window.lang]

    return _item
  })
}

class Nav extends React.Component {
  constructor(props) {
    super(props)

    const device = getDevice()
    // TODO
    // for dev
    // device.isApp = true

    if (
      !device.isApp ||
      (device.platform === 'iOS' && device.version <= 1.1) ||
      (device.platform === 'Android' && device.version <= 1.2)
    ) {
      navs.pop()
    }

    this.state = {
      items: getNavs(),
      current: props.current,
    }

    this.handleClick = (item) => {
      if (item.title === this.state.current) {
        return
      }

      window.location.href = item.link
    }
  }

  render() {
    const createItem = (item) => {
      let klas = item.title

      if (item.title === this.state.current) {
        klas += ' on'
      }

      return (
        <li
          key={item.title}
          className={klas}
        >
          <a
            href={item.link}
            onClick={(e) => {
              e.preventDefault()
              this.handleClick(item)
            }}
          >
            <i className={`iconfont ${item.icon}`}></i>
            <span>{item.text}</span>
          </a>
        </li>
      )
    }

    return (
      <ul className="nav g-c-nav">
        {this.state.items.map(createItem)}
      </ul>
    )
  }
}

Nav.propTypes = {
  current: React.PropTypes.string.isRequired,
}

export default Nav
