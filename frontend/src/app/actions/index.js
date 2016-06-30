import axios from 'axios'

const request = (options) => {
  const opts = Object.assign({}, options, {
    headers: {
      authorization: `JWT ${window.localStorage.getItem('token')}`
    }
  })

  return axios(opts)
}

function addTodo (payload) {
  return request({
    method: 'post',
    url: '/api/todos',
    data: payload
  })
}

function deleteTodo (id) {
  return request({
    method: 'delete',
    url: `/api/todos/${id}`
  })
}

function updateTodo (id, payload) {
  return request({
    method: 'put',
    url: `/api/todos/${id}`,
    data: payload
  })
}

function fetchTodos () {
  return request({
    method: 'get',
    url: '/api/todos'
  })
}

function editTask (id, payload) {
  return request({
    method: 'put',
    url: `/api/todos/${id}`,
    data: payload
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

export const EDIT_TASK = (id, payload) => ({
  type: 'EDIT_TASK',
  id,
  task: payload.task
})

export const DELETE_TODO = (id) => ({
  type: 'DELETE_TODO',
  id
})

export const TOGGLE_TODO = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const ATTEMPT_EDIT_TASK = (id, payload) => {
  return function (dispatch) {
    dispatch(EDIT_TASK(id, payload))
    return editTask(id, payload)
  }
}

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
        dispatch(ADD_TODO(response.data))
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
