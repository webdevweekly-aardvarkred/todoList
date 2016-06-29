import React, { PropTypes } from 'react'
import Todo from './Todo'

const order = {
  'low': 0,
  'moderately': 1,
  'highly': 2
}

const Todos = (
  {
    todos,
    ATTEMPT_DELETE: deleteTodo,
    ATTEMPT_TOGGLE: toggleTodo,
    ATTEMPT_SELECT_IMPORTANCE: selectImportance
  }
) => {
  return (
    <ul className='todos'>
      {todos.sort((a, b) => {
        if (order[a.importance] > order[b.importance]) {
          return -1
        }
        if (order[a.importance] === order[b.importance]) {
          return 0
        }

        return 1
      }).map((todo, i) => {
        return (
          <Todo key={i}
            {...todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            selectImportance={selectImportance}
          />
          )
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
  ATTEMPT_DELETE: PropTypes.func,
  ATTEMPT_TOGGLE: PropTypes.func,
  ATTEMPT_SELECT_IMPORTANCE: PropTypes.func
}

export default Todos
