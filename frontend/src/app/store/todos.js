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
    default:
      return state
  }
}
