import getDevice from 'js/util/_device'
import parseURL from 'js/util/_uri'

const SOURCE = {
  '/': '首页票房',
  '/booking': '首页排片',
  '/cinemas': '首页影院',
  '/rank': '首页排行',
  '/coming': '即将上映',
  '/movie': '影片详情',
  '/cinema': '影院详情',
  '/download': 'APP 下载',
}

class AppShare extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShow: true,
      source: '首页票房',
    }

    const platform = getDevice().platform
    const version = getDevice().version

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

    this.onClickShare = () => {
      const shareWrap = document.querySelector('.g-c-nav-share')
      shareWrap.style.display = 'none'
      const appEl = document.getElementById('content')
      appEl.className = 'g-c-share-img'

      ga('send', 'event', '拍照', 'click', this.state.source, 1)

      if (!version) {
        window.scrollTo(0, 0)
      }

      if (platform === 'iOS') {
        this.connectWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('clickShare', window.shareinfo, () => {
            appEl.className = ''
            shareWrap.style.display = 'block'
          })
        })
      } else if (platform === 'Android') {
        window.androidCallBack = () => {
          appEl.className = ''
        }
        if (window.clickShare && window.clickShare.clickShare) {
          window.clickShare.clickShare(JSON.stringify(window.shareinfo), 'androidCallBack')
          shareWrap.style.display = 'block'
        }
      }
    }

    this.show = () => {
      const uri = parseURL(window.location)
      const path = uri.path
      const isApp = getDevice().isApp

      this.setState({ source: SOURCE[path] })

      if (
        !isApp ||
        /mine/.test(path) ||
        /feedback/.test(path) ||
        /news_detail/.test(path)
      ) {
        this.setState({ isShow: false })
      }
    }
  }

  componentDidMount() {
    this.show()
  }

  render() {
    const isShow = this.state.isShow
    if (isShow) {
      this.appinit()
    }
    const navShare = isShow ? 'g-c-nav-share' : 'g-c-nav-share hide'
    return (
      <div className={ navShare }>
        <h4 onClick={() => this.onClickShare()}><i className="iconfont icon-share"></i></h4>
      </div>
    )
  }
}

export default AppShare
