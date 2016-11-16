import './comparison_select.styl'

import { Provider } from 'react-redux'

import createStore from 'js/redux/_store'

import reducer from './reducers/_select'

import SelectContainer from './containers/_select'

const store = createStore({ reducer })

const node = document.getElementById('content')

ReactDOM.render(
  <Provider store={store}>
    <SelectContainer />
  </Provider>,
  node
)
