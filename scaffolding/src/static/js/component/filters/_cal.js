import klas from 'classnames'

import {
  getDays,
  zeroize,
  dateDiff,
} from 'js/util/_date'

const LANG_CONFIG = {
  cn: ['日', '一', '二', '三', '四', '五', '六'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

const LANG = LANG_CONFIG[window.lang]
const today = Gon.today

class Cal extends React.Component {
  constructor(props) {
    super(props)

    const {
      date,
    } = props

    this.state = {
      date,
    }

    this.onClickDay = (date) => {
      this.props.onClickDay(date)

      this.setState({ date })
    }

    this.onClickPrevMonth = () => {
      const date = new Date(this.state.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      this.setState({
        date: `${month === 1 ? year - 1 : year}/${month === 1 ? 12 : zeroize(month - 1)}/01`,
      })
    }

    this.onClickNextMonth = () => {
      const date = new Date(this.state.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      this.setState({
        date: `${month === 12 ? year + 1 : year}/${month === 12 ? 1 : zeroize(month + 1)}/01`,
      })
    }

    this.onClickHideCal = (e) => {
      if (!$(e.target).closest('table').length && !$(e.target).closest('.hd').length) {
        this.props.onClickHideCal()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date) {
      this.setState({
        date: nextProps.date,
      })
    }
  }

  renderThead() {
    const createThead = (day, idx) => <th key={idx}>{day}</th>

    return (
      <thead>
        <tr>{LANG.map(createThead)}</tr>
      </thead>
    )
  }

  renderTbody() {
    const {
      limit,
      validFrom,
    } = this.props

    const days = getDays(this.state.date)

    const createTd = (item) => {
      const isDisabled = dateDiff(item.date) < limit ||
        (validFrom && item.date < validFrom)

      const tdClass = klas(item.klas, {
        today: today === item.date,
        on: this.state.date === item.date,
        disable: isDisabled,
      })

      return (
        <td
          key={item.date}
          className={tdClass}
          onClick={isDisabled ? () => {} : () => this.onClickDay(item.date)}
        >
          {item.day}
        </td>
      )
    }

    const createTr = (item, idx) => <tr key={idx}>{item.map(createTd)}</tr>

    return (
      <tbody>
        {days.map(createTr)}
      </tbody>
    )
  }

  render() {
    const {
      isShow,
    } = this.props

    const title = Gon.formatDate(this.state.date, { format: 'MMMM YYYY' })

    const calClass = klas('g-c-cal', {
      on: isShow,
      hide: !isShow,
    })

    return (
      <div className={calClass} onClick={this.onClickHideCal}>
        <div className="hd">
          <span className="btn-prev" onClick={this.onClickPrevMonth}>&lt;</span>
          <h3>{title}</h3>
          <span className="btn-next" onClick={this.onClickNextMonth}>&gt;</span>
        </div>
        <div className="bd">
          <table>
            {this.renderThead()}
            {this.renderTbody()}
          </table>
        </div>
      </div>
    )
  }
}

Cal.defaultProps = {
  date: today,
}

Cal.propTypes = {
  date: React.PropTypes.string.isRequired,
  isShow: React.PropTypes.bool.isRequired,
  limit: React.PropTypes.number.isRequired,
  validFrom: React.PropTypes.string,
  onClickDay: React.PropTypes.func.isRequired,
  onClickHideCal: React.PropTypes.func.isRequired,
}

export default Cal
