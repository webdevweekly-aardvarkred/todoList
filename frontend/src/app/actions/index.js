import axios from 'axios'

function addTodo (payload) {
  return axios.post('/api/todos', payload)
}

function deleteTodo (id) {
  return axios.delete(`/api/todos/${id}`)
}

function toggleTodo (id, payload) {
  return axios.put(`/api/todos/${id}`, payload)
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

export const TOGGLE_TODO = (id) => ({
  type: 'TOGGLE_TODO',
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
        console.log(err, err.stack)
      })
  }
}

export const ATTEMPT_DELETE = (id) => {
  return function (dispatch) {
    dispatch(DELETE_TODO(id))
    return deleteTodo(id)
      .catch(err => {
        console.log(err, err.stack)
      })
  }
}

export const ATTEMPT_TOGGLE = (id, payload) => {
  return function (dispatch) {
    dispatch(TOGGLE_TODO(id))
    return toggleTodo(id, payload)
      .catch(err => {
        console.log(err, err.stack)
        dispatch(TOGGLE_TODO(id))
      })
  }
}
