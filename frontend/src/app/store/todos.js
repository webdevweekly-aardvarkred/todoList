function toggleComplete (todo) {
  return Object.assign({}, todo, {
    completed: !todo.completed
  })
}

function selectImportance (todo, importance) {
  return Object.assign({}, todo, {
    importance
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
        return todo.id === action.id ? toggleComplete(todo) : todo
      })
    case 'SELECT_IMPORTANCE':
      return state.map(todo => {
        return todo.id === action.id ? selectImportance(todo, action.importance) : todo
      })
    default:
      return state
  }
}
