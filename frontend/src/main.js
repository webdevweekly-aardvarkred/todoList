import React from 'react'
import axios from 'axios'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './app/components/App'
import rootReducer from './app/store'

axios.get('/api/todos')
  .then(response => {
    if (response.status === 200) {
      return response.data.data
    }
  })
  .catch(err => {
    console.log(err)
  })
  .then(state => {
    const store = createStore(rootReducer, { todos: state }, applyMiddleware(thunk))

    const Root = (
      <Provider store={store}>
        <App />
      </Provider>
    )

    render(Root, document.getElementById('app'))
  })
