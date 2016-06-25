let id = 0

export const ADD_TODO = (payload) => ({
  id: id++,
  text: payload.text,
  completed: payload.completed
})

export const ATTEMPT_ADD = (payload) => {
  return function (dispatch) {
    fakeApiCall(payload)
      .then(payload => {
        dispatch(ADD_TODO(payload))
      })
  }
}

const fakeApiCall = (payload) => new Promise((resolve, reject) => {
  return resolve(payload)
})
