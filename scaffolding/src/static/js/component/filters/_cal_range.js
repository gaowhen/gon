import klas from 'classnames'

import {
  dateDiff,
  getDateDiff,
  getFirstDay,
  isDateInMonth,
} from 'js/util/_date'

const today = Gon.today

class CalRange extends React.Component {
  constructor(props) {
    super(props)

    this.cached = {}

    this.state = {
      renderRemainingMonth: false,
    }

    this.renderMonth = this.renderMonth.bind(this)
  }

  componentWillReceiveProps(props) {
    const node = document.getElementById(`${props.id}`)

    if (!this.state.renderRemainingMonth && node.scrollHeight) {
      this.setState({
        renderRemainingMonth: true,
      })

      node.scrollTop = node.scrollHeight - 10
    }
  }

  renderMonth(month, idx) {
    const {
      date,
      endDate,
      limit,
    } = this.props

    const isInMonth = isDateInMonth(date, month)
    const cachedKeyAffix = isInMonth ? '' : (date + endDate)
    const cachedKey = Gon.formatDate(month) + cachedKeyAffix

    if (this.cached[cachedKey]) {
      return this.cached[cachedKey]
    }

    const createTd = (item, idx) => {
      if (!item.date) {
        return <td key={idx}></td>
      }

      const isDisabled = dateDiff(item.date) < limit

      const isInRange = date && endDate &&
        getDateDiff(date, item.date) >= 0 && getDateDiff(endDate, item.date) <= 0

      const tdClass = klas({
        today: today === item.date,
        start: date === item.date,
        end: endDate === item.date,
        'in-range': isInRange,
        disabled: isDisabled,
      })

      return (
        <td
          key={idx}
          className={tdClass}
          onClick={isDisabled ? () => {} : () => this.props.onClickDay(item.date)}
        >
          <span className="inner">
            {item.day}
          </span>
        </td>
      )
    }

    const createTr = (days, idx) => <tr key={idx}>{days.map(createTd)}</tr>

    const createMonth = (month, idx) => {
      const daysRows = []
      const monthDays = month.getDate()
      const days = []

      const firstDay = getFirstDay(month.getFullYear(), month.getMonth() + 1)
      const offset = firstDay === 7 ? 0 : firstDay

      for (let i = 0; i < offset; i++) {
        days.push({})
      }

      for (let i = 1; i <= monthDays; i++) {
        const date = new Gon.Date(month.getFullYear(), month.getMonth(), i)
        days.push({
          date: Gon.formatDate(date),
          day: i,
        })
      }

      for (let i = 0; i < days.length; i += 7) {
        daysRows.push(days.slice(i, i + 7))
      }

      let title
      if (window.lang === 'cn') {
        title = `${month.getFullYear()} 年 ${month.getMonth() + 1} 月`
      } else {
        title = `${month.getFullYear()}-${month.getMonth() + 1}`
      }

      return (
        <div className="c-month" key={idx}>
          <div className="hd">
            {title}
          </div>
          <div className="bd">
            <table>
              <tbody>
                {daysRows.map(createTr)}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    const monthNode = createMonth(month, idx)
    this.cached[cachedKey] = monthNode

    return monthNode
  }

  renderMonths({ id, months, isShow }) {
    const wrapClass = klas('g-c-cal-range', { on: isShow })

    return (
      <div className={wrapClass} id={id}>
        {months.map(this.renderMonth)}
      </div>
    )
  }

  render() {
    const {
      id,
      isShow,
      limit,
      validFrom,
      endDate,
    } = this.props

    const lastDate = new Gon.Date(Gon.getBjTime() - limit * 24 * 60 * 60 * 1000)
    const d = new Gon.Date(endDate)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const months = [new Date(year, month, 0)]

    if (this.state.renderRemainingMonth) {
      const monthDiff = (lastDate.getFullYear() - year) * 12 + (lastDate.getMonth() + 1 - month + 1)
      for (let i = 1, len = monthDiff; i < len; i++) {
        months.push(new Date(year, (month + i), 0))
      }
    }

    const earlyDate = new Gon.Date(validFrom)
    const earlyMonthDiff = (year - earlyDate.getFullYear()) * 12 + month - earlyDate.getMonth()
    for (let i = earlyMonthDiff; i > 1; i--) {
      months.unshift(new Date(year, (i - earlyMonthDiff + month - 1), 0))
    }

    return this.renderMonths({ months, id, isShow })
  }
}

CalRange.defaultProps = {
  validFrom: '2011-01-01',
  maxRange: 30,
}

CalRange.propTypes = {
  id: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  // 当前天数往后可选多少天
  limit: React.PropTypes.number.isRequired,
  isShow: React.PropTypes.bool.isRequired,
  endDate: React.PropTypes.string,
  validFrom: React.PropTypes.string,
  onClickDay: React.PropTypes.func.isRequired,
}

export default CalRange
