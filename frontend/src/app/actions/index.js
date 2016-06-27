import axios from 'axios'

function addTodo (payload) {
  return axios.post('/api/todos', payload)
}

export const ADD_TODO = ({ id, task, completed, importance }) => ({
  type: 'ADD_TODO',
  id,
  task,
  completed,
  importance
})

export const ATTEMPT_ADD = (payload) => {
  return function (dispatch) {
    return addTodo(payload)
      .then(response => {
        if (response.status === 200) {
          return dispatch(ADD_TODO(payload))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
