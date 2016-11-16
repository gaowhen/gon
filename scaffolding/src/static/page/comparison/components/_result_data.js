import zip from 'lodash/zip'

import DateRange from 'js/component/filters/_date_range'

import ChartLine from '../components/_chart_line'
import DataList from '../components/_data_list'

class ResultData extends React.Component {
  constructor(props) {
    super(props)
    const {
      ids,
      tab,
      getServerData,
    } = this.props

    getServerData(ids, tab)

    this.onChangeDate = (date, endDate) => {
      const {
        ids,
        tab,
      } = this.props

      this.props.changeDateAndFetchData(ids, { date, endDate }, tab)
    }
  }

  shouldComponentUpdate(props) {
    return props.data !== this.props.data || props.isShow !== this.props.isShow
  }

  render() {
    const {
      data,
      tab,
      date,
      endDate,
    } = this.props

    const categories = data.map((d) => d.name)

    let titleData = []
    if (categories.length) {
      const dateText = window.lang === 'cn' ? '日期' : 'Date'
      titleData = [dateText, ...categories]
    }

    let dates
    if (data[0]) {
      const length = data[0].boxoffice.length
      dates = data[0].boxoffice.map((num, idx) => {
        const offset = length - idx - 1
        const newDate = Gon.formatDate(
          new Gon.Date(endDate).getTime() - offset * 24 * 60 * 60 * 1000
        )

        return newDate
      })
    }

    const showDays = data.map((d) => d.showDay)
    const indicatorData = data.map((d) => d[tab])

    const chartData = [dates, ...indicatorData]
    // 转成按行排列的表格数据
    const tableData = zip(...chartData)

    return (
      <div className={`c-result-${tab}`}>
        <div className="c-filter">
          <DateRange
            id={`${tab}_cal_range`}
            date={date}
            endDate={endDate}
            limit={0}
            onChangeDate={this.onChangeDate}
          />
        </div>
        <ChartLine
          id={`${tab}-chart-line`}
          tab={tab}
          categories={categories}
          data={chartData}
          showDays={showDays}
        />
        <DataList
          titleData={titleData}
          data={tableData}
        />
      </div>
    )
  }
}

ResultData.propTypes = {
  tab: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
  ids: React.PropTypes.array.isRequired,
  date: React.PropTypes.string.isRequired,
  endDate: React.PropTypes.string.isRequired,
  isShow: React.PropTypes.bool.isRequired,
  getServerData: React.PropTypes.func.isRequired,
  changeDateAndFetchData: React.PropTypes.func.isRequired,
}

export default ResultData
