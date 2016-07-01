import React, { Component } from 'react'
import { withRouter } from 'react-router'
import xss from 'xss'

class TodoInput extends Component {
  componentWillReceiveProps (next) {
    console.log(next)
  }

  onSubmit (e) {
    e.preventDefault()

    const { ATTEMPT_ADD: addTodo } = this.props
    const input = this.refs.todoInput
    const todo = xss(input.value.trim())

    if (todo) {
      addTodo({
        task: todo,
        importance: 'low',
        completed: false
      }).then(() => {
        input.value = ''
      }).catch((err) => {
        const status = err.status
        if (status >= 400 && status <= 500) {
          this.props.router.replace('/login')
        }
      })
    }
  }

  render () {
    return (
      <section className='todo-form'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input placeholder='Things to do..' type='text' ref='todoInput' />
        </form>
      </section>
    )
  }
}

export default withRouter(TodoInput)
