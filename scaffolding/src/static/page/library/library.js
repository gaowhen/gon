import './library.styl'

import { Provider } from 'react-redux'

import Library from './_index'
import createStoreWithMiddlewares from './_store'
import filter from './_reducer'

const store = createStoreWithMiddlewares(filter)

const node = document.getElementById('content')

ReactDOM.render(
  <Provider store={store}>
    <Library />
  </Provider>,
  node
)
