const LANG = {
  cn: {
    wechatIndex: '微信指数',
    gross: '总票房榜',
    daily: '日票房榜',
  },
  en: {
    wechatIndex: 'Wechat Index',
    gross: 'Overall Record',
    daily: 'Daily Record',
  },
}

const Lang = LANG[window.lang]

function PageNav() {
  return (
    <ul className="page-nav">
      <li>
        <a href="/wechatindex">
          <div><i className="iconfont icon-weixin"></i></div>
          <p>{Lang.wechatIndex}</p>
        </a>
      </li>
      <li>
        <a href="/overallrecord">
          <div><i className="iconfont icon-bigrank"></i></div>
          <p>{Lang.gross}</p>
        </a>
      </li>
      <li>
        <a href="/dailyrecord">
          <div><i className="iconfont icon-champion"></i></div>
          <p>{Lang.daily}</p>
        </a>
      </li>
    </ul>
  )
}

export default PageNav
