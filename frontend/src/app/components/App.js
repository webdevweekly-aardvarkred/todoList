import React, { Component } from 'react'
import TodoInputContainer from '../containers/TodoInputContainer'
import Todos from './Todos'

/* this is our root component */

class App extends Component {
  render () {
    return (
      <div class='container'>
        <TodoInputContainer />
        <Todos todos={this.props.todos} />
      </div>
    )
  }
}

export default App
