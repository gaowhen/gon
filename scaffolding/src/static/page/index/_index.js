import { connect } from 'react-redux'
import { debounce } from 'throttle-debounce'

import share from 'js/util/_share'
import getDevice from 'js/util/_device'
import 'js/util/_upload'

import {
  updateDataFromServer,
  changeFilterToUpdate,
  clearTimeInterval,
} from './_action'

import Ads from 'js/component/global/_ads'
import Feedback from 'js/component/global/_feedback'
import Nav from 'js/component/global/_nav'
import DatePicker from 'js/component/filters/_date_picker'

import Head from 'js/component/global/_head_new'
import BoardContainer from './container/_board'
import BoardMiniContainer from './container/_board_mini'
import RankContainer from './container/_rank'
import FilterIndicatorContainer from './container/_filter_indicator'

function mapStateToProps(state) {
  return {
    date: state.filters.date,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDataFromServer: () => dispatch(updateDataFromServer()),
    changeFilterToUpdate: (filter) => dispatch(changeFilterToUpdate(filter)),
  }
}

window.shareinfo = {
  title: '实时票房榜-娱票儿票房分析，透过数据看电影',
  desc: 'http://piaofang.wepiao.com/',
  url: 'http://piaofang.wepiao.com/',
  height: 970,
}

const device = getDevice()

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showBoardMini: false,
      fixRank: false,
    }

    const {
      updateDataFromServer,
      changeFilterToUpdate,
    } = props

    const shareTtile = '实时票房榜-微票儿票房分析，透过数据看电影'
    share({ title: shareTtile })

    updateDataFromServer()

    this.onChangeDate = (date) => {
      changeFilterToUpdate({ date })

      sessionStorage.setItem(window.IndexCachekeyFilterDate, date)
    }

    this.checkPosition = () => {
      const heightA = this.$datePicker.offsetHeight + this.$board.offsetHeight / 2
      const heightB = this.$datePicker.offsetHeight + this.$board.offsetHeight
      if (!this.state.showBoardMini && this.$main.scrollTop >= heightA) {
        this.setState({ showBoardMini: true })
      }

      if (this.state.showBoardMini && this.$main.scrollTop < heightA) {
        this.setState({ showBoardMini: false })
      }

      if (!this.state.fixRank && this.$main.scrollTop > heightB) {
        this.setState({ fixRank: true })
      }

      if (this.state.fixRank && this.$main.scrollTop < heightB) {
        this.setState({ fixRank: false })
      }
    }

    this.debounceCheckPosition = debounce(200, this.checkPosition)

    this.handleScroll = () => this.debounceCheckPosition()
  }

  componentDidMount() {
    sessionStorage.setItem(window.CachekeyIndex, this.refs.wrap.outerHTML)

    window.addEventListener('unload', () => {
      window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler('closeSocket')
    })

    this.handleScroll()

    this.$datePicker = ReactDOM.findDOMNode(this.refs.dataPicker)
    this.$board = ReactDOM.findDOMNode(this.refs.board)
    this.$main = ReactDOM.findDOMNode(this.refs.main)

    this.$main.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnMount() {
    clearTimeInterval()
    this.$main.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const {
      date,
    } = this.props


    return (
      <div ref="wrap" className={`index-wrap${device.isApp ? ' in-app' : ''}`}>
        <Head
          isShowComing
          source="首页票房"
        />
        {
          this.state.showBoardMini ? <BoardMiniContainer /> : null
        }
        <div className="main" ref="main">
          <div className="boxoffice-wrap">
            <Ads
              isShow
              id={device.isApp ? 51 : 55}
            />
            <DatePicker
              ref="dataPicker"
              date={date}
              source="首页票房"
              onChangeDate={this.onChangeDate}
            />
            <BoardContainer
              ref="board"
            />
            <RankContainer
              fix={this.state.fixRank}
            />
            <Feedback
              uri="/"
            />
          </div>
        </div>
        <FilterIndicatorContainer />
        <Nav
          current="boxoffice"
        />
      </div>
    )
  }
}

Index.propTypes = {
  date: React.PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
