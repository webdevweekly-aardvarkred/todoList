import React, { PropTypes } from 'react'
import Todo from './Todo'

const Todos = ({ todos, ATTEMPT_DELETE: deleteTodo }) => {
  return (
    <ul className='todos'>
      {todos.map((todo, i) => {
        return <Todo key={i} {...todo} deleteTodo={deleteTodo} />
      })}
    </ul>
  )
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    {
      completed: PropTypes.bool,
      id: PropTypes.number,
      task: PropTypes.string,
      importance: PropTypes.string
    }
  )),
  ATTEMPT_DELETE: PropTypes.func
}

export default Todos
