import React from 'react'

export default ({ task, importance, completed, id }) => {
  return (
    <li className='todo-item' data-id={id} data-importance={importance}>
      {task}
    </li>
  )
}
