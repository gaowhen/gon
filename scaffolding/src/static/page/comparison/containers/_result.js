import parseURL from 'js/util/_uri'
import share from 'js/util/_share'

import HeadLite from 'js/component/global/_head_lite'

import ResultTabs from '../components/_result_tabs'
import createContainer from '../containers/_create_result_container'

const url = parseURL(window.location)
const params = url.params
const ids = params.movie_ids && decodeURIComponent(params.movie_ids).split('|')

class Result extends React.Component {
  constructor(props) {
    super(props)

    const shareTtile = '热门影院排行—微票儿票房分析，透过数据看电影'
    share({ title: shareTtile })
  }

  render() {
    const {
      LANG_RESULT,
      boxoffice,
      showtime,
      getServerData,
      changeDateAndFetchData,
    } = this.props

    const LANG = LANG_RESULT

    return (
      <div className="comparison-result-wrap">
        <HeadLite
          title={LANG.HeadLite.title}
          back={-2}
        />
        <div className="main">
          <ResultTabs
            ids={ids}
            lang={LANG.ResultTabs}
            boxoffice={boxoffice}
            showtime={showtime}
            getServerData={getServerData}
            changeDateAndFetchData={changeDateAndFetchData}
          />
        </div>
      </div>
    )
  }
}

Result.propTypes = {
  LANG_RESULT: React.PropTypes.object.isRequired,
  boxoffice: React.PropTypes.object.isRequired,
  showtime: React.PropTypes.object.isRequired,
  getServerData: React.PropTypes.func.isRequired,
  changeDateAndFetchData: React.PropTypes.func.isRequired,
}

export default createContainer(Result)
