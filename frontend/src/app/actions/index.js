import axios from 'axios'

function addTodo (payload) {
  return axios.post('/api/todos', payload, {
    headers: {
      authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })
}

function deleteTodo (id) {
  return axios.delete(`/api/todos/${id}`, {
    headers: {
      authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })
}

function updateTodo (id, payload) {
  return axios.put(`/api/todos/${id}`, payload, {
    headers: {
      authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })
}

function fetchTodos () {
  return axios.get('/api/todos', {
    headers: {
      authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })
}

export const INIT = ({ todos }) => ({
  type: 'INIT',
  todos
})

export const ADD_TODO = ({ todo }) => ({
  type: 'ADD_TODO',
  id: todo.id,
  task: todo.task,
  completed: todo.completed,
  importance: todo.importance
})

export const SELECT_IMPORTANCE = (id, payload) => ({
  type: 'SELECT_IMPORTANCE',
  id,
  importance: payload.importance
})

export const DELETE_TODO = (id) => ({
  type: 'DELETE_TODO',
  id
})

export const TOGGLE_TODO = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const ATTEMPT_FETCH = () => {
  return function (dispatch) {
    return fetchTodos()
      .then(response => {
        dispatch(INIT(response.data))
      })
  }
}

export const ATTEMPT_ADD = (payload) => {
  return function (dispatch) {
    return addTodo(payload)
      .then(response => {
        if (response.status === 200) {
          return dispatch(ADD_TODO(response.data))
        }
      })
  }
}

export const ATTEMPT_DELETE = (id) => {
  return function (dispatch) {
    dispatch(DELETE_TODO(id))
    return deleteTodo(id)
  }
}

export const ATTEMPT_SELECT_IMPORTANCE = (id, payload) => {
  return function (dispatch) {
    dispatch(SELECT_IMPORTANCE(id, payload))
    return updateTodo(id, payload)
  }
}

export const ATTEMPT_TOGGLE = (id, payload) => {
  return function (dispatch) {
    dispatch(TOGGLE_TODO(id))
    return updateTodo(id, payload)
  }
}
