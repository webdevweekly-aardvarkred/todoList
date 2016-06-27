import React, { Component } from 'react'
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
      })
    }
  }

  render () {
    return (
      <section className='todo-form'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type='text' ref='todoInput' />
          <button type='input'>Add Todo</button>
        </form>
      </section>
    )
  }
}

export default TodoInput
