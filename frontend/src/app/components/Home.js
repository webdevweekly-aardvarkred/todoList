import React, { Component, PropTypes } from 'react'
import Todos from '../containers/TodosContainer'
import TodoInputContainer from '../containers/TodoInputContainer'
import Loader from './Loader'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount () {
    const { ATTEMPT_FETCH: fetchTodos } = this.props

    fetchTodos()
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const loader = {
      display: this.state.loading ? 'block' : 'none'
    }

    const app = {
      display: this.state.loading ? 'none' : 'block'
    }

    return (
      <div class='container'>
        <Loader loading={loader} />
        <div className='todos-container' style={app}>
          <TodoInputContainer />
          <Todos />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  ATTEMPT_FETCH: PropTypes.func
}

export default Home
