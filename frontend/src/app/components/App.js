import React, { Component } from 'react'
import { Link } from 'react-router'

/* this is our root component */

class App extends Component {
  render () {
    return (
      <div className='app-container'>
        <header>
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default App
