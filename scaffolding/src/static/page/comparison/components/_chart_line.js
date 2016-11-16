import getChartLineOption from './_chart_line_option'

const stats = {
  boxoffice: '票房数据图表',
  showtime: '排片数据图表',
}

class ChartLine extends React.Component {
  componentDidUpdate() {
    this.props.data.length > 1 && this.createChart()
  }

  createChart() {
    const {
      categories,
      showDays,
      data,
      id,
      tab,
    } = this.props

    const chart = echarts.init(document.getElementById(id))
    const option = getChartLineOption({
      tab,
      categories,
      data,
      showDays,
    })

    chart.setOption(option)
  }

  render() {
    const {
      id,
      categories,
      tab,
    } = this.props

    const style = { height: '250px' }
    return (
      <div
        className="c-chart-wrap"
        onClick={() => {ga('send', 'event', stats[tab], 'click', Gon.page, 1)}}
      >
        <div id={id} style={style}>
        </div>
        <div className="legend">
          <ul>
            {categories.map((category, idx) => <li key={idx}>{category}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

ChartLine.propTypes = {
  id: React.PropTypes.string.isRequired,
  tab: React.PropTypes.string.isRequired,
  showDays: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
}

export default ChartLine
