import klas from 'classnames'

import showTip from 'js/util/_tip'

import CalRange from './_cal_range'

const LANG_CONFIG = {
  cn: {
    week: ['日', '一', '二', '三', '四', '五', '六'],
    confirm: '确定',
    selectTip: '请选择时间段',
  },
  en: {
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    confirm: 'Ok',
    selectTip: 'Select Date Range',
  },
}

const lang = LANG_CONFIG[window.lang]
const yesterday = Gon.yesterday

class DateRange extends React.Component {
  constructor(props) {
    super(props)

    const {
      date,
      endDate,
    } = this.props

    this.state = {
      date,
      endDate,
      isValid: date && endDate,
      isShowCal: false,
    }

    this.onClickDate = () => {
      const isShowCal = !this.state.isShowCal

      this.setState({
        isShowCal,
      })

      ga('send', 'event', '选择时间范围', 'click', Gon.page, 1)
      fixScroll(isShowCal)
    }

    this.onClickDay = (date) => {
      const {
        maxRange,
      } = this.props

      if (this.state.date && !this.state.endDate) {
        const dateDiff = new Gon.Date(this.state.date) - new Gon.Date(date)

        if (Math.abs(dateDiff) < maxRange * 24 * 60 * 60 * 1000) {
          const dates = {
            date: dateDiff < 0 ? this.state.date : date,
            endDate: dateDiff < 0 ? date : this.state.date,
          }
          this.setState({ ...dates, isValid: true })
        } else {
          const tip = window.lang === 'cn' ? `最多可选 ${maxRange} 天` : `Max ${maxRange} Days`
          showTip(tip)
        }
      } else if (this.state.endDate) {
        this.setState({ date, endDate: null, isValid: false })
      } else {
        this.setState({ date, isValid: false })
      }
    }

    this.onClickHideCal = (e) => {
      if (e.target === ReactDOM.findDOMNode(this.refs.dateRange)) {
        this.setState({
          isShowCal: false,
        })

        fixScroll(false)
      }
    }

    this.onClickDocument = (e) => {
      if (this.state.isShowCal && !ReactDOM.findDOMNode(this).contains(e.target)) {
        this.setState({
          isShowCal: false,
        })

        fixScroll(false)
      }
    }

    this.onChangeDate = () => {
      this.props.onChangeDate(this.state.date, this.state.endDate)
      this.setState({ isShowCal: false })

      fixScroll(false)
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
        endDate: props.endDate,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument, false)
    document.removeEventListener('touchend', this.onClickDocument, false)
  }

  render() {
    const {
      id,
      limit,
      date,
      endDate,
      validFrom,
    } = this.props

    const wrapClass = klas('g-c-date-range', { on: this.state.isShowCal })
    const dateRangeClass = klas('c-date-range', { on: this.state.isShowCal })
    const btnClass = klas('btn', { disabled: !this.state.isValid })

    let btn
    if (this.state.isValid) {
      btn = <a className={btnClass} href="#" onClick={this.onChangeDate}>{lang.confirm}</a>
    } else {
      btn = <a className={btnClass} href="#">{lang.selectTip}</a>
    }

    return (
      <div className={wrapClass}>
        <div className="c-date">
          <div className="bd" onClick={this.onClickDate}>
            <i className="iconfont icon-calendar"></i>
            <span className="date-range">
              <span className="date">
                {date}
              </span>
              <span className="date">
                {endDate}
              </span>
            </span>
            <i className="iconfont icon-arrow-down"></i>
          </div>
        </div>

        <div
          ref="dateRange"
          className={dateRangeClass}
          onClick={this.onClickHideCal}
        >
          <div className="wrap">
            <div className="hd">
              <ul>
                {lang.week.map((w, idx) => <li key={idx}>{w}</li>)}
              </ul>
            </div>
            <div className="bd">
              <CalRange
                id={id}
                date={this.state.date}
                endDate={this.state.endDate}
                limit={limit}
                validFrom={validFrom}
                isShow={this.state.isShowCal}
                onClickDay={this.onClickDay}
                onClickHideCal={this.onClickHideCal}
              />
            </div>
            <div className="ft">
              {btn}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DateRange.defaultProps = {
  date: yesterday,
  endDate: Gon.formatDate(new Gon.Date(yesterday) - 7 * 24 * 60 * 60 * 1000),
  // 从哪天开始往后不可点击，以当日为基准，算 datediff, 默认为当日后 15 天内
  limit: -15,
  maxRange: 30,
  validFrom: '2011-01-01',
}

DateRange.propTypes = {
  id: React.PropTypes.string.isRequired,
  date: React.PropTypes.string,
  endDate: React.PropTypes.string,
  // 限制最多选择多少天
  limit: React.PropTypes.number,
  // 最大可选时间天数
  maxRange: React.PropTypes.number,
  validFrom: React.PropTypes.string,
  onChangeDate: React.PropTypes.func.isRequired,
}

export default DateRange
