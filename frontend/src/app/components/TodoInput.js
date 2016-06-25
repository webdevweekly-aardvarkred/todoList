import React, { Component } from 'react'

class TodoInput extends Component {
  render () {
    console.log(this.props)
    return (
      <section className='todo-input'>
        <input type='text' ref='todoInput' />
      </section>
    )
  }
}

export default TodoInput
