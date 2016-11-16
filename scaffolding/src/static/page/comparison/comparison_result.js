import './comparison_result.styl'

import { Provider } from 'react-redux'

import createStore from 'js/redux/_store'

import reducer from './reducers/_result'

import ResultContainer from './containers/_result'

const store = createStore({ reducer })

const node = document.getElementById('content')

ReactDOM.render(
  <Provider store={store}>
    <ResultContainer />
  </Provider>,
  node
)
