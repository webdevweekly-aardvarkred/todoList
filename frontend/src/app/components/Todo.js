import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import Importance from './Importance'

function unauth (err, replace) {
  const status = err.status
  if (status >= 400 && status <= 500) {
    replace('/login')
  }
}

const Todo = (
  {
    task,
    importance,
    completed,
    id,
    deleteTodo,
    toggleTodo,
    selectImportance,
    router
  }
) => {
  return (
    <li className='todo-item' data-id={id} data-importance={importance}>
      <div className='todo-item-container'>
        <input
          onChange={(e) => {
            toggleTodo(id, { completed: !completed })
              .catch((err) => {
                unauth(err, router.replace)
              })
          }}
          type='checkbox'
          checked={completed}
          value='completed' />
        {task}
        <button onClick={(e) => {
          deleteTodo(id)
            .catch((err) => {
              unauth(err, router.replace)
            })
        }}>delete</button>
      </div>
      <div className='importance-input'>
        {['low', 'moderately', 'highly'].map((value, i) => (
          <Importance
            unauth={unauth}
            importance={importance}
            value={value}
            key={i} id={id}
            selectImportance={selectImportance} />
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
  selectImportane: PropTypes.func,
  router: PropTypes.object
}

export default withRouter(Todo)
