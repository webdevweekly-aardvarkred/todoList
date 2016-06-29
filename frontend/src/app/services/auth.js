import axios from 'axios'

class Auth {
  me (token) {
    return axios.get('/api/users', {
      headers: {
        'Authorization': `JWT ${token}`
      }
    })
  }

  login (credentials) {
    return axios.post('/api/users/authenticate', credentials)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token)
      })
  }

}

export default new Auth()
