import Head from 'js/component/global/_head_new'
import Nav from 'js/component/global/_nav'
import Ads from 'js/component/global/_ads'

import getDevice from 'js/util/_device'

import NewsContainer from './_news_container'

const device = getDevice()

function NewsList() {
  return (
    <div className="news-wrap">
      <div className="hd">
        <Head
          isShowComing
          source="行业资讯"
          active={2}
        />
      </div>
      <div className="bd">
        <Ads
          isShow
          id={device.isApp ? 157 : 155}
        />
        <NewsContainer />
      </div>
      <div className="ft">
        <Nav
          current="boxoffice"
        />
      </div>
    </div>
  )
}

export default NewsList
