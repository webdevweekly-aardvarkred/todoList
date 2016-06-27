import axios from 'axios'

function addTodo (payload) {
  return axios.post('/api/todos', payload)
}

function deleteTodo (id) {
  return axios.delete(`/api/todos/${id}`)
}

export const ADD_TODO = ({ id, task, completed, importance }) => ({
  type: 'ADD_TODO',
  id,
  task,
  completed,
  importance
})

export const DELETE_TODO = (id) => ({
  type: 'DELETE_TODO',
  id
})

export const ATTEMPT_ADD = (payload) => {
  return function (dispatch) {
    return addTodo(payload)
      .then(response => {
        if (response.status === 200) {
          return dispatch(ADD_TODO(response.data.data))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const ATTEMPT_DELETE = (id) => {
  return function (dispatch) {
    return deleteTodo(id)
      .then(response => {
        if (response.status === 200) {
          return dispatch(DELETE_TODO(id))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
