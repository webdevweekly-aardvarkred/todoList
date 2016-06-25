let id = 0

export const ADD_TODO = (payload) => ({
  type: 'ADD_TODO',
  id: id++,
  text: payload.text,
  completed: payload.completed
})

export const ATTEMPT_ADD = (payload) => {
  return function (dispatch) {
    return fakeApiCall(payload)
      .then(payload => {
        dispatch(ADD_TODO(payload))
      })
  }
}

const fakeApiCall = (payload) => Promise.resolve(payload)
