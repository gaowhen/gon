import { dateDiff } from 'js/util/_date'
import showTip from 'js/util/_tip'

import ChartTrendContainer from '../container/_chart_trend'

const LANG = {
  sold: {
    cn: '实时票房指今日所有场次已售出票房',
    en: 'Including all the tickets that have been sold today',
  },
  presell: {
    cn: '预售票房指该日已售出的票房',
    en: 'Presell of the daell of the day',
  },
  forecast: {
    cn: '今日预测',
    en: 'Estimated Box Office',
  },
}

function getDateText(date, lang) {
  const diff = dateDiff(date)
  const day = diff === 0 ? '实时' : Gon.formatDate(date, { format: 'YYYY-MM-DD ddd' })
  const txt = {
    sold: {
      cn: `${day}大盘`,
      en: '',
    },
    presell: {
      cn: `${day}预售`,
      en: '',
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

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.onClickTip = (date) => {
      let tip
      if (dateDiff(date) < 0) {
        tip = LANG.presell[window.lang]
      } else if (dateDiff(date) === 0) {
        tip = LANG.sold[window.lang]
      } else {
        tip = ''
      }

      showTip(tip)
    }
  }

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
    const icon = dateDiff(date) <= 0 &&
      <i className="icon-point" onClick={() => this.onClickTip(date)}>!</i>

    return (
      <p>
        <span className="update-txt">
          {getUpdateText(date)}
        </span>
        {icon}
        {/* <a href="/forecast">{LANG.forecast[window.lang]} <sup>Beta</sup> ></a> */}
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
      <div className={`c-board ${dateDiff(date) < 0 ? 'future' : ''}`}>
        <div className="hd">
          {this.renderDataText(newBoxoffice, date)}
          {this.renderUpdateText(date)}
        </div>
        <div className="bd">
          <ChartTrendContainer />
        </div>
      </div>
    )
  }
}

Board.propTypes = {
  date: React.PropTypes.string.isRequired,
  boxoffice: React.PropTypes.array.isRequired,
}

export default Board
