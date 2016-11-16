import getChartOpt from './_chart_trend_option'

import LANG from '../_lang'

const lang = LANG.ChartTrend

class ChartTrend extends React.Component {
  componentDidMount() {
    this.createChart(this.props)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.trend !== this.props.trend) {
      this.createChart(nextProps)
      return true
    }
    return false
  }

  createChart(props) {
    const {
      id,
      trend,
      date,
    } = props

    const chart = echarts.init(document.getElementById(id))
    const option = getChartOpt({ trend, date })

    chart.setOption(option)
  }

  render() {
    const {
      id,
      trend,
      date,
    } = this.props

    // 需求更改去掉准确率显示
    const accuracy = '-'

    const style = { height: '95px' }
    const today = window.lang === 'cn' ? '今日' : 'Today'
    const lastDate = trend.date[trend.date.length - 1]
    const newDate = (Gon.today === date) ? today : `${lastDate} `

    return (
      <div
        className="c-chart-trend"
      >
        <div className="bd" id={id} style={style}></div>
        <div className="ft">
          <div className="legend">
            <p>{lang.trend}</p>
          </div>
          {
            typeof accuracy === 'number' ?
            <div className="forecast">
              <span>{`${newDate}${lang.accuracy}${(accuracy * 100).toFixed(1)}%`}</span>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

ChartTrend.propTypes = {
  id: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  accuracy: React.PropTypes.number.isRequired,
  trend: React.PropTypes.object.isRequired,
}

export default ChartTrend
