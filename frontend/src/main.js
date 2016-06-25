import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './app/components/App'
import rootReducer from './app/store'

const store = createStore(rootReducer, applyMiddleware(thunk))

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(Root, document.getElementById('app'))
