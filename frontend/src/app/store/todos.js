function toggleTodo (todo, action) {
  return Object.assign({}, todo, {
    completed: action.completed
  })
}

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: action.id,
        task: action.task,
        importance: action.importance,
        completed: action.completed
      }]
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(todo => {
        return todo.id === action.id ? toggleTodo(todo, action) : todo
      })
    default:
      return state
  }
}
