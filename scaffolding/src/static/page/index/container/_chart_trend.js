import containerCreator from '../container_creator/_chart_trend'
import ChartTrend from '../component/_chart_trend'

function ChartTrendContainer(props) {
  return (
    <ChartTrend
      id="chart_trend"
      {...props}
    />
  )
}

export default containerCreator(ChartTrendContainer)
