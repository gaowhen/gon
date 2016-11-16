import klas from 'classnames'

import { dateDiff } from 'js/util/_date'

import Cal from './_cal'

const LANG_CONFIG = {
  cn: {
    prev: '前一天',
    next: '后一天',
  },
  en: {
    prev: 'Prev',
    next: 'Next',
  },
}

const LANG = LANG_CONFIG[window.lang]

class DatePicker extends React.Component {
  constructor(props) {
    super(props)

    const {
      date,
      source,
      validFrom,
    } = props

    this.state = {
      date,
      isShowCal: false,
    }

    this.onClickPrev = () => {
      if (validFrom && this.state.date === validFrom) {
        return
      }

      const date = Gon.formatDate(this.state.date, { offset: -1 })

      this.setState({
        date,
        isShowCal: false,
      })

      fixScroll(false)
      ga('send', 'event', '前一天', 'click', source, 1)

      this.props.onChangeDate(date)
    }

    this.onClickNext = () => {
      const date = Gon.formatDate(this.state.date, { offset: 1 })

      this.setState({
        date,
        isShowCal: false,
      })

      fixScroll(false)
      ga('send', 'event', '后一天', 'click', source, 1)

      this.props.onChangeDate(date)
    }

    this.onClickDate = () => {
      const isShowCal = !this.state.isShowCal

      this.setState({
        isShowCal,
      })

      fixScroll(isShowCal)
      ga('send', 'event', '日期筛选', 'click', source, 1)
    }

    this.onClickHideCal = () => {
      this.setState({
        isShowCal: false,
      })

      fixScroll(false)
    }

    this.onClickDay = (date) => {
      this.setState({
        date,
        isShowCal: false,
      })

      fixScroll(false)
      ga('send', 'event', '日期切换', 'click', source, 1)

      this.props.onChangeDate(date)
    }

    this.onClickDocument = (e) => {
      if (this.state.isShowCal && !ReactDOM.findDOMNode(this).contains(e.target)) {
        this.setState({
          isShowCal: false,
        })

        fixScroll(false)
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument, false)
    document.addEventListener('touchend', this.onClickDocument, false)
  }

  componentWillReceiveProps(props) {
    if (props.date) {
      this.setState({
        date: props.date,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument, false)
    document.removeEventListener('touchend', this.onClickDocument, false)
  }

  renderPrev() {
    const {
      isShowSwitch,
    } = this.props

    if (isShowSwitch) {
      return (
        <div className="nav-time nav-prev">
          <span
            onClick={this.onClickPrev}
          >
            <i className="icon-arrow-left"></i>
            {LANG.prev}
          </span>
        </div>
      )
    }

    return ''
  }

  renderNext() {
    const {
      isShowSwitch,
      limit,
    } = this.props

    const diff = dateDiff(this.state.date)
    const isDisabled = diff <= limit

    const nextClass = klas({
      disable: isDisabled,
    })

    if (isShowSwitch) {
      return (
        <div className="nav-time nav-next">
          <span
            className={nextClass}
            onClick={isDisabled ? () => {} : this.onClickNext}
          >
            {LANG.next}
            <i className="icon-arrow-right"></i>
          </span>
        </div>
      )
    }

    return ''
  }

  render() {
    const {
      limit,
      validFrom,
    } = this.props

    const navCalClass = klas('nav-calendar', {
      on: this.state.isShowCal,
    })

    return (
      <div className="g-c-date-picker">
        <div className="hd">
          {this.renderPrev()}
          <div className={navCalClass}>
            <i className="icon-calendar"></i>
            <span
              className="date"
              onClick={this.onClickDate}
            >
              {this.state.date}
            </span>
            <i className="icon-arrow-down"></i>
          </div>
          {this.renderNext()}
        </div>
        <div className="bd">
          <Cal
            date={this.state.date}
            isShow={this.state.isShowCal}
            limit={limit}
            validFrom={validFrom}
            onClickDay={this.onClickDay}
            onClickHideCal={this.onClickHideCal}
          />
        </div>
      </div>
    )
  }
}

DatePicker.defaultProps = {
  // 从哪天开始往后不可点击，以当日为基准，算 datediff, 默认为当日后 15 天内
  limit: -15,
  isShowSwitch: true,
}

DatePicker.propTypes = {
  source: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  isShowSwitch: React.PropTypes.bool,
  limit: React.PropTypes.number,
  validFrom: React.PropTypes.string,
  onChangeDate: React.PropTypes.func.isRequired,
}

export default DatePicker
