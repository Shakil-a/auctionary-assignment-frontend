const API_URL = 'http://localhost:3333'
import { reactive } from 'vue'

async function parseResponse(response) {
  const contentType = response.headers.get("content-type")

  let data
  if (contentType && contentType.includes("application/json")) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    throw data
  }

  return data
}

export const authState = reactive({
  sessionToken: localStorage.getItem('session_token') || null
})


export const userService = {
  login(email, password) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(parseResponse)
    .then(data => {
      localStorage.setItem("user_id", data.user_id)
      localStorage.setItem("session_token", data.session_token)
      authState.sessionToken = data.session_token // update reactive state
      return data
    })
  },

  register(userData) {
    return fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    .then(parseResponse)
  },

  logout() {
    return fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'X-Authorization': localStorage.getItem("session_token")
      }
    })
    .then(parseResponse)
    .then(() => {
      localStorage.removeItem("user_id")
      localStorage.removeItem("session_token")
      authState.sessionToken = null
    })
  },

  getProfile(userId) {
    return fetch(`${API_URL}/users/${userId}`)
      .then(parseResponse)
  }
}