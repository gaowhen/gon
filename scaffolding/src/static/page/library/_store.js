import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux'

import thunk from 'redux-thunk'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

const createStoreWithMiddlewares = compose(applyMiddleware(...middlewares))(createStore)

export default createStoreWithMiddlewares
