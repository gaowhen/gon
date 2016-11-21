import './index.styl'

import { AppContainer } from 'react-hot-loader'
import Index from './_index'

const node = document.getElementById('content')

// 配置 React hot loader 示例
// 可参考 https://github.com/gaearon/react-hot-loader/issues/243
ReactDOM.render(
  <AppContainer>
    <Index />
  </AppContainer>,
  node
)

if (module.hot) {
  // 注册当模块变动后执行相应的回调
  module.hot.accept([
    'page/index/_index',
  ], () => {
    // 当旧的模块被替换后，需要重新 require 才能获取到最新的代码
    /* eslint-disable global-require */
    const Index = require('./_index').default

    ReactDOM.render(
      <AppContainer>
        <Index />
      </AppContainer>,
      node
    )
  })
}
