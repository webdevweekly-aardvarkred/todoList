import React, { Component } from 'react'
import { Link } from 'react-router'

/* this is our root component */

class App extends Component {
  render () {
    return (
      <div className='app-container'>
        <header>
          <nav>
            <ul>
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
                <Link to='/login'>login</Link>
              </li>
            </ul>
          </nav>
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default App
