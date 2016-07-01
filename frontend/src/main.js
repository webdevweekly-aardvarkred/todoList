import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import Auth from './app/services/auth'

import App from './app/components/App'
import Home from './app/containers/HomeContainer'
import Login from './app/components/Login'

import rootReducer from './app/store'

function validate (next, replace, cb) {
  const token = window.localStorage.getItem('token')

  if (!token) {
    replace('/login')
    cb()
  }

  Auth.me(token)
    .then((response) => {
      if (response.statusText === 'OK') {
        cb()
      }
    })
    .catch((err) => {
      replace('/login')
      cb()
      return err
    })
}

function isLoggedIn (next, replace, cb) {
  const token = window.localStorage.getItem('token')

  if (!token) {
    cb()
  }

  Auth.me(token)
    .then(() => {
      replace('/')
      cb()
    })
    .catch((err) => {
      cb()
      return err
    })
}

const store = createStore(rootReducer, applyMiddleware(thunk))

const Root = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} onEnter={validate} />
        <Route path='login' component={Login} onEnter={isLoggedIn} />
      </Route>
    </Router>
  </Provider>
)

render(Root, document.getElementById('app'))
