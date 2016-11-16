import getDevice from 'js/util/_device'

const LANG = {
  title: {
    cn: '在线反馈',
    en: 'Online Feedback',
  },
  intro: {
    cn: '娱票儿票房分析 － 透过数据看电影',
    en: 'Box Office Weiying － Read Movies through the Data.',
  },
  download: {
    cn: '下载客户端',
    en: 'Download APP',
  },
}

class Feedback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: LANG.title[window.lang],
      intro: LANG.intro[window.lang],
      download: LANG.download[window.lang],
    }
  }

  render() {
    const klas = getDevice().isApp ? ' hide' : ''
    const uri = `/feedback?from=${this.props.uri}`

    return (
      <div className="feedback-wrap g-c-feedback">
        <div className="hd">
          <div className={`link-wrap${klas}`}>
            <a href="/download">
              <i className="iconfont icon-download"></i>
              <span>{this.state.download}</span>
            </a>
          </div>
          <div className="link-wrap">
						<a href={uri}>
							<i className="iconfont icon-feedback"></i>
							<span>{this.state.title}</span>
						</a>
					</div>
          <p>{this.state.intro}</p>
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  uri: React.PropTypes.string.isRequired,
}

export default Feedback
