import React from 'react'
import Todo from './Todo'

export default ({ todos }) => (
  <ul className='todos'>
    {todos.map((todo, i) => {
      return <Todo key={i} {...todo} />
    })}
  </ul>
)
