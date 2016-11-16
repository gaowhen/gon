import { AppContainer } from 'react-hot-loader'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'

import './index.styl'

import createStoreWithMiddlewares from './_store'
import data from './reducer/_data'
import filters from './reducer/_filters'
import ui from './reducer/_ui'
import NextApp from './_index'

const node = document.getElementById('content')

setCachedHTML(node, window.CachekeyIndex)

const reducers = combineReducers({
  data,
  filters,
  ui,
})

const store = createStoreWithMiddlewares(reducers)

// 配置 React hot loader 示例
// 可参考 https://github.com/gaearon/react-hot-loader/issues/243
// 需要使用 AppContainer
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <NextApp />
    </Provider>
  </AppContainer>,
  node
)

if (module.hot) {
  // 注册当模块变动后执行相应的回调
  module.hot.accept([
    'page/index/_index',
    'page/index/reducer/_data',
    'page/index/reducer/_filters',
    'page/index/reducer/_ui',
  ], () => {
    // 当旧的模块被替换后，需要重新 require 才能获取到最新的代码
    /* eslint-disable global-require */
    const data = require('./reducer/_data').default
    const filters = require('./reducer/_filters').default
    const ui = require('./reducer/_ui').default

    const nextReducers = combineReducers({
      data,
      filters,
      ui,
    })

    store.replaceReducer(nextReducers)

    const NextApp = require('./_index').default
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      node
    )
  })
}
