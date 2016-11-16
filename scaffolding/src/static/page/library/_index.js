import Head from 'js/component/global/_head'
import Nav from 'js/component/global/_nav'

import PageNav from './component/_page_nav'
import SoonContainer from './container/_soon'

function Library() {
  return (
    <div className="library-wrap">
      <div className="hd">
        <Head
          isShowComing={false}
          source="library"
        />
      </div>
      <div className="bd">
        <PageNav />
        <SoonContainer />
      </div>
      <div className="ft">
        <Nav
          current="library"
        />
      </div>
    </div>
  )
}

export default Library
