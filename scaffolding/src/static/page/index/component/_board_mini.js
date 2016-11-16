import { dateDiff } from 'js/util/_date'

function getDateText(date, lang) {
  const diff = dateDiff(date)
  const day = diff === 0 ? '实时' : Gon.formatDate(date, { format: 'YYYY-MM-DD ddd' })
  const txt = {
    sold: {
      cn: `${day}大盘`,
      en: 'Box Office',
    },
    presell: {
      cn: `${day}预售`,
      en: 'Box Office',
    },
  }

  if (diff < 0) {
    return txt.presell[lang]
  }

  return txt.sold[lang]
}

function getUpdateText(date) {
  const diff = dateDiff(date)
  const time = Gon.formatDate(Gon.getBjTime(), { format: 'HH:mm:ss' })

  const txt = {
    init: {
      cn: '每天上午 10 点更新前一天的数据',
      en: 'Updates at 10am everyday',
    },
    thisDay: {
      cn: `北京时间 ${time}`,
      en: `Beijing Time ${time}`,
    },
  }

  if (diff > 0) {
    return txt.init[window.lang]
  }

  return txt.thisDay[window.lang]
}

class BoardMini extends React.Component {
  renderDataText(boxoffice, date) {
    const dateTxt = getDateText(date, window.lang)

    const num = parseFloat(boxoffice)

    // 单位为 1
    // 并根据当前语言返回相应 但是 中文版单位都是万，英文版单位都是M
    if (window.lang === 'cn') {
      if (num > 9999) {
        return (
          <h3>
            <span>{dateTxt}</span>
            <strong>
              {(num / 10000).toFixed(1)}
            </strong>
            <span>万</span>
          </h3>
        )
      }
    } else if (window.lang === 'en') {
      if (num > 9999) {
        return (
          <h3>
            <span>{dateTxt}</span>
            <strong>
              {(num / 1000000).toFixed(2)}
            </strong>
            <span>M</span>
          </h3>
        )
      }
    }

    return (
      <h3>
        <span>{dateTxt}</span>
        <strong>
          {num.toFixed(2)}
        </strong>
      </h3>
    )
  }

  renderUpdateText(date) {
    if (dateDiff(date) > 0) {
      return null
    }

    return (
      <p>
        <span className="update-txt">
          {getUpdateText(date)}
        </span>
      </p>
    )
  }

  render() {
    const {
      date,
      boxoffice,
    } = this.props

    const newBoxoffice = boxoffice[0]

    return (
      <div className="c-board-mini">
        <div className="hd">
          {this.renderDataText(newBoxoffice, date)}
          {this.renderUpdateText(date)}
        </div>
      </div>
    )
  }
}

BoardMini.propTypes = {
  date: React.PropTypes.string.isRequired,
  boxoffice: React.PropTypes.array.isRequired,
}

export default BoardMini
