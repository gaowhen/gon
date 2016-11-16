import klas from 'classnames'

const PERIOD = [
  {
    title: 'full',
    cn: '全时段',
    en: 'All',
    period: 0,
  },
  {
    title: 'fringe',
    cn: '非黄金时段',
    en: 'Fringe',
    period: 2,
  },
  {
    title: 'prime',
    cn: '黄金时段',
    en: 'Prime',
    period: 1,
    intro: '(18:00 - 21:00)',
  },
]

class FilterPeriod extends React.Component {
  constructor(props) {
    super(props)

    const {
      period,
      source,
    } = props

    this.state = {
      period,
      isActive: false,
    }

    this.onClickHead = () => {
      const isActive = !this.state.isActive

      this.setState({
        isActive,
      })

      fixScroll(isActive)

      ga('send', 'event', '时段筛选', 'click', source, 1)
    }

    this.onChangePeriod = (period) => {
      this.setState({
        period,
        isActive: false,
      })

      fixScroll(false)

      this.props.onChangePeriod(period)
    }

    this.onClickHideBody = (e) => {
      if (!$(e.target).closest('.period').length) {
        this.setState({
          isActive: false,
        })

        fixScroll(false)
      }
    }

    this.onClickDocument = (e) => {
      if (this.state.isActive && !ReactDOM.findDOMNode(this).contains(e.target)) {
        this.setState({
          isActive: false,
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

  renderItems() {
    return PERIOD.map((item) => (
        <li key={item.title} onClick={() => this.onChangePeriod(item.period)}>
          <span>{item[window.lang]}{item.intro ? item.intro : ''}</span>
        </li>
      )
    )
  }

  render() {
    const period = (PERIOD.filter((item) => item.period === this.state.period))[0]

    const hdClass = klas('hd', {
      on: this.state.isActive,
    })
    const bdClass = klas('bd', {
      hide: !this.state.isActive,
    })

    return (
      <div className="g-c-filter-period">
        <div className={hdClass} onClick={this.onClickHead}>
          <i className="icon-duration"></i>
          <span>{period[window.lang]}</span>
          <i className="icon-arrow-down"></i>
        </div>
        <div className={bdClass} onClick={this.onClickHideBody}>
          <ul className="period">{this.renderItems()}</ul>
        </div>
      </div>
    )
  }
}

FilterPeriod.defaultProps = {
  period: 0,
}

FilterPeriod.propTypes = {
  source: React.PropTypes.string.isRequired,
  period: React.PropTypes.number,
  onChangePeriod: React.PropTypes.func.isRequired,
}

export default FilterPeriod
