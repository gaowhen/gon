class HeadLite extends React.Component {
  constructor(props) {
    super(props)

    this.goback = (e) => {
      if (this.props.url) {
        return false
      }

      e.preventDefault()

      if (history.length <= 2) {
        window.location.href = '/'
        return false
      }

      if (this.props.back) {
        history.go(this.props.back)
      } else {
        history.go(-1)
      }

      return false
    }
  }

  render() {
    const {
      title,
      url,
    } = this.props

    return (
      <div className="head-lite-wrap g-c-head-lite">
        <div className="hd">
          <a
            href={decodeURIComponent(url)}
            onClick={this.goback}
          >
          <i className="iconfont icon-back"></i>
          </a>
          <span className="logo"><img src="{{{img/icon/logo.png}}}" /></span>
          <h1>{title}</h1>
        </div>
      </div>
    )
  }
}

HeadLite.propTypes = {
  // 接受 url 参数跳转，废弃之前的 uri 参数
  url: React.PropTypes.string,
  back: React.PropTypes.number,
  title: React.PropTypes.string.isRequired,
  forceRefresh: React.PropTypes.bool,
}

export default HeadLite
