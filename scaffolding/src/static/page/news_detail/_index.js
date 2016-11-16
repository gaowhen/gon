import getDevice from 'js/util/_device'
import HeadLite from 'js/component/global/_head_lite'

import parseURL from 'js/util/_uri'
import { getNewsDetail } from 'js/util/_api'

import { getCategoryName } from '../news/_helper'

const LANG = {
  cn: {
    title: '资讯详情',
    share: '分享',
  },
  en: {
    title: 'News Detail',
    share: 'Share',
  },
}

const device = getDevice()
const Lang = LANG[window.lang]

const uri = parseURL()
const params = uri.params

const _category = params.category ? params.category : 0

class NewsDetail extends React.Component {
  constructor(props) {
    super(props)

    const id = params.id

    this.state = {
      id,
      title: '',
      date: '',
      content: '',
      reading: 0,
      category: 0,
      share: {
        title: '',
        desc: '',
        thumb: '',
      },
    }

    getNewsDetail(id)
    .then((res) => {
      const {
        title,
        date,
        content,
        reading,
        category,
        share,
      } = res.data

      this.setState({
        title,
        date,
        content,
        reading,
        category,
        share,
      })
    })

    this.onClickShare = () => {
      const {
        title,
        desc,
        thumb,
      } = this.state.share

      const platform = JSON.stringify([
        {
          platForm: '6',
          url: window.location.href,
        },
        {
          platForm: '7',
          url: window.location.href,
        },
        {
          platForm: '1',
          url: window.location.href,
        },
        {
          platForm: '8',
          url: window.location.href,
        },
        {
          platForm: '2',
          url: window.location.href,
        },
      ])

      const content = `${title} ${desc} ${window.location.href}`
      let url = `wxta://shareplatform?title=${encodeURIComponent(title)}&icon=http:${thumb}&content=${encodeURIComponent(content)}&platform=${encodeURIComponent(platform)}`

      if (
        device.platform === 'iOS' && device.version > 1.8 ||
        device.platform === 'Android' && device.version > 1.5
     ) {
        url = `pffx://share?title=${encodeURIComponent(title)}&icon=http:${thumb}&content=${encodeURIComponent(content)}&url=${encodeURIComponent(window.location.href)}&platform=${encodeURIComponent(platform)}`
      }

      window.location.href = url
    }
  }

  render() {
    const {
      title,
      date,
      content,
      reading,
      category,
    } = this.state

    let share = (
      <a
        className="share"
        onClick={
          (e) => {
            e.preventDefault()
            this.onClickShare()
          }
        }
      >
        <i className="iconfont icon-share-norm"></i>
        <span className="text">{Lang.share}</span>
      </a>
    )

    let qrcode = null

    if (!device.isApp) {
      share = null
      qrcode = (
        <div className="ft">
          <p><img src="{{{img/icon/qrcode.jpg}}}" /></p>
          <p>查看更多行业资讯</p>
          <p>下载娱票儿票房分析客户端</p>
        </div>
      )
    }

    return (
      <div className="news-detail-wrap">
        <div className="hd">
          <HeadLite
            url={`/news?category=${_category}`}
            title={Lang.title}
          />
        </div>
        <div className="bd">
          <div className="detail">
            <div className="hd">
              <h2 className="title">{title}</h2>
              <p className="meta">
                <span className="meta-category">{getCategoryName(category)}</span>
                <span className="meta-date">{date}</span>
              </p>
            </div>
            <div
              className="bd"
              dangerouslySetInnerHTML={{ __html: content }}
            >
            </div>
            {qrcode}
          </div>
        </div>
        <div className="ft">
          {share}
          <span className="reading">
            <i className="iconfont icon-eyes"></i>
            {reading}
          </span>
        </div>
      </div>
    )
  }
}

export default NewsDetail
