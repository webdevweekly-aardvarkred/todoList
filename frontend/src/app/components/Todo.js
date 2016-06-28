import React, { PropTypes } from 'react'
import Importance from './Importance'

const Todo = (
  {
    task,
    importance,
    completed,
    id,
    deleteTodo,
    toggleTodo,
    selectImportance
  }
) => {
  return (
    <li className='todo-item' data-id={id} data-importance={importance}>
      <div className='todo-item-container'>
        <input
          onChange={(e) => toggleTodo(id, { completed: !completed })}
          type='checkbox'
          checked={completed}
          value='completed' />
        {task}
        <button onClick={() => deleteTodo(id)}>delete</button>
      </div>
      <div className='importance-input'>
        {['low', 'moderately', 'highly'].map((value, i) => (
          <Importance importance={importance} value={value} key={i} id={id} selectImportance={selectImportance} />
        ))}
      </div>
    </li>
  )
}

Todo.propTypes = {
  task: PropTypes.string,
  importance: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  selectImportane: PropTypes.func
}

export default Todo
