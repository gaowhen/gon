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

const createStoreWithMiddlewares = ({
  reducer,
  newMiddlewares = [],
  preloaderState,
  enhancer,
}) => {
  const allMiddlewares = [...middlewares, ...newMiddlewares]

  const newCreateStore = compose(applyMiddleware(...allMiddlewares))(createStore)

  return newCreateStore(reducer, preloaderState, enhancer)
}

export default createStoreWithMiddlewares
