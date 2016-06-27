import React, { PropTypes } from 'react'

const Todo = ({ task, importance, completed, id, deleteTodo, toggleTodo }) => {
  return (
    <li className='todo-item' data-id={id} data-importance={importance}>
      <input
        onChange={(e) => toggleTodo(id, { completed: !completed })}
        type='checkbox'
        checked={completed}
        value='completed' />
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
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func
}

export default Todo
