import Head from 'js/component/global/_head'
import HeadLite from 'js/component/global/_head_lite'
import Nav from 'js/component/global/_nav'
import Feedback from 'js/component/global/_feedback'

function UI() {
  return (
    <div className="ui-wrap">
      <div className="hd">
        <Head
          isShowComing
          source="ui"
        />
        <HeadLite
          title="UI guideline"
          uri="/ui"
          source="ui"
        />
      </div>
      <div className="bd">
        <div className="g-c-tip"><i className="icon-sound"></i>公告。。。</div>
        <div className="g-c-tab">
          <ul className="tab">
            <li className="on">影院</li>
            <li>院线</li>
          </ul>
          <div className="tab-panel on"></div>
          <div className="tab-panel"></div>
        </div>
        <ul className="g-c-tab-hollow">
          <li className="on"><span>场次</span></li>
          <li className=""><span>座位</span>
          </li>
        </ul>
        <ul className="g-c-tab-solid">
          <li className="on"><span>趋势</span></li>
          <li className=""><span>分城市</span>
          </li>
          <li className=""><span>分院线</span>
          </li>
        </ul>
        <ul className="g-c-tab-square">
          <li className="on">日期</li>
          <li className="">想看
          </li>
        </ul>
        <div className="btn-wrap">
          <a className="g-c-btn-more">+更多</a>
          <a className="g-c-btn">按钮</a>
          <a className="g-c-btn-hollow radius">获取验证码</a>
          <a className="g-c-btn-hollow disabled radius">重发(60S)</a>
          <a className="g-c-btn-solid radius">完成注册</a>
          <a className="g-c-btn-solid disabled radius">完成注册</a>
          <a className="g-c-btn-block">确定</a>
          <a className="g-c-btn-block disabled">确定</a>
        </div>
        <Feedback
          uri="/ui"
        />
      </div>
      <div className="ft">
        <Nav
          current="boxoffice"
        />
      </div>
    </div>
  )
}

export default UI
