import Tab from 'js/component/global/_tab'

import ResultData from '../components/_result_data'

const stats = ['票房数据', '排片数据']

class ResultTabs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 0,
    }

    this.onClickTab = (active) => {
      this.setState({ active })
      ga('send', 'event', stats[active], 'click', Gon.page, 1)
    }
  }

  render() {
    const {
      lang,
      ids,
      boxoffice,
      showtime,
      getServerData,
      changeDateAndFetchData,
    } = this.props

    return (
      <div className="c-result-tabs">
        <Tab
          items={lang.tabs}
          onClickTab={(active) => this.onClickTab(active)}
        >
          <ResultData
            isShow={this.state.active === 0}
            tab="boxoffice"
            ids={ids}
            lang={lang}
            data={boxoffice.data}
            date={boxoffice.date}
            endDate={boxoffice.endDate}
            getServerData={getServerData}
            changeDateAndFetchData={changeDateAndFetchData}
          />
          <ResultData
            isShow={this.state.active === 1}
            tab="showtime"
            ids={ids}
            lang={lang}
            data={showtime.data}
            date={showtime.date}
            endDate={showtime.endDate}
            getServerData={getServerData}
            changeDateAndFetchData={changeDateAndFetchData}
          />
        </Tab>
      </div>
    )
  }
}

ResultTabs.propTypes = {
  ids: React.PropTypes.array.isRequired,
  lang: React.PropTypes.object.isRequired,
  boxoffice: React.PropTypes.object.isRequired,
  showtime: React.PropTypes.object.isRequired,
  getServerData: React.PropTypes.func.isRequired,
  changeDateAndFetchData: React.PropTypes.func.isRequired,
}

export default ResultTabs
