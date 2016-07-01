import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from '../styles/main.css'

/* this is our root component */

class App extends Component {
  render () {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}

export default App
