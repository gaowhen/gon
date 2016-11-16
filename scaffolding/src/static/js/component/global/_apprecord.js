import getDevice from 'js/util/_device'

class AppRecord extends React.Component {
  constructor(props) {
    super(props)

    const platform = getDevice().platform

    this.state = {
      isRecord: true,
      isCancle: false,
      isFirst: false,
      isShowRecord: false,
    }

    this.appinit = () => {
      if (platform === 'iOS' && !window.isiOSInit) {
        window.isiOSInit = true
        this.connectWebViewJavascriptBridge((bridge) => {
          bridge.init((message, responseCallback) => {
            if (responseCallback) {
              responseCallback()
            }
          })
        })
      }
    }

    this.connectWebViewJavascriptBridge = (callback) => {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
          callback(WebViewJavascriptBridge)
        }, false)
      }
    }

    this.onClickRecord = (event) => {
      ga('send', 'event', '录制视频', '点击录制视频', '直播全国', 1)

      const top = event.target.getBoundingClientRect().top
      const left = event.target.getBoundingClientRect().left

      const IosInfo = JSON.stringify({
        title: `直播全国电影实时出票|${Gon.formatDate(Gon.getBjTime(), { format: 'MM-DD HH:mm' })}`,
        desc: '我录制了一段全国实时出票视频，快来围观吧～',
        url: 'http://piaofang.wepiao.com/record',
        coordinate: [top, left],
      })
      const AndroidInfo = JSON.stringify({
        title: `直播全国电影实时出票|${Gon.formatDate(Gon.getBjTime(), { format: 'MM-DD HH:mm' })}`,
        desc: '我录制了一段全国实时出票视频，快来围观吧～',
        url: 'http://piaofang.wepiao.com/record',
      })
      if (platform === 'iOS') {
        this.setState({ isRecord: false, isFirst: false })
        this.connectWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('startRecord', IosInfo, () => {
            this.setState({ isRecord: true })
          })
        })
      } else if (platform === 'Android') {
        window.startCallBack = () => {
          this.setState({ isRecord: false, isCancle: true, isFirst: false })
        }
        window.androidCallBack = () => {
          this.setState({ isRecord: true, isCancle: false })
        }
        if (window.screenRecord && window.screenRecord.startRecord) {
          window.screenRecord.startRecord(AndroidInfo, 'startCallBack', 'androidCallBack')
        }
      }
    }

    this.onClickCancle = () => {
      if (platform === 'Android') {
        window.androidCallBack = () => {
          this.setState({ isRecord: true, isCancle: false })
        }
        if (window.screenRecord && window.screenRecord.endRecord) {
          window.screenRecord.endRecord('androidCallBack')
        }
      }
    }
    this.isShowRecord = () => {
      const FirstInfo = JSON.stringify({
        title: 'first',
      })
      if (platform === 'iOS') {
        this.connectWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('isFirstUse', FirstInfo, (response) => {
            if (response | 0) {
              this.setState({ isFirst: true })
            }
          })
        })
      } else if (platform === 'Android') {
        if (window.screenRecord && window.screenRecord.isFirst) {
          if (window.screenRecord.isFirst()) {
            this.setState({ isFirst: true })
          }
        }
        if (window.screenRecord && window.screenRecord.isShowRecord) {
          if (window.screenRecord.isShowRecord()) {
            this.setState({ isShowRecord: true })
          }
        }
      }
    }
  }

  componentDidMount() {
    this.isShowRecord()
  }

  render() {
    const isApp = getDevice().isApp
    let navRecord = 'hide'

    if (isApp) {
      this.appinit()
    }

    if (isApp && getDevice().platform === 'iOS') {
      if (getDevice().version > 1.2) {
        navRecord = ''
      }
    } else if (isApp && getDevice().platform === 'Android') {
      if (this.state.isShowRecord) {
        navRecord = ''
      }
      if (this.state.isCancle) {
        navRecord = 'cover'
      }
    }

    return (
      <div className={`nav-record ${navRecord}`}>
        { this.state.isRecord ?
          <i className="icon-record" onClick={this.onClickRecord}></i> :
          null }
        { this.state.isCancle ?
          <i className="icon-cancle" onClick={() => this.onClickCancle()}>取消</i> :
          null }
        { this.state.isFirst ?
          <div className="share-call"><span>点击一下，录制小视频跟朋友分享吧</span></div> :
          null }
      </div>
    )
  }
}

export default AppRecord
