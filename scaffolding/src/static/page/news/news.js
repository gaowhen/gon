import './news.styl'

import { Provider } from 'react-redux'

import NewsList from './_index'
import createStoreWithMiddlewares from './_store'
import filter from './_reducer'

const store = createStoreWithMiddlewares(filter)

const node = document.getElementById('content')

ReactDOM.render(
  <Provider store={store}>
    <NewsList />
  </Provider>,
  node
)
