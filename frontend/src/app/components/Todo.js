import React, { PropTypes } from 'react'

const Todo = ({ task, importance, completed, id, deleteTodo }) => {
  return (
    <li className='todo-item' data-id={id} data-importance={importance}>
      {task}
      <button onClick={() => deleteTodo(id)}>delete</button>
    </li>
  )
}

Todo.propTypes = {
  task: PropTypes.string,
  importance: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default Todo
