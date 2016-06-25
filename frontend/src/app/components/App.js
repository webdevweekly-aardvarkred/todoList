import React, { Component } from 'react'
import TodoInputContainer from '../containers/TodoInputContainer'

/* this is our root component */

class App extends Component {
  render () {
    return (
      <div class='container'>
        <TodoInputContainer />
      </div>
    )
  }
}

export default App
