const API_URL = 'http://localhost:3000'

function handleResponse(res) {
  if (!res.ok) {
    return res.json().then(err => Promise.reject(err))
  }
  return res.json()
}

export const userService = {
  login(credentials) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(handleResponse)
  },

  register(userData) {
    return fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(handleResponse)
  }
}
