const API_URL = 'http://localhost:3333'

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
      return data
    })
  },

  register(userData) {
    return fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    .then(parseResponse)
  },

  logout(){
    return fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': localStorage.getItem("session_token")
              },
      body: JSON.stringify(userData)
    })
    .then((response) => {
      if(response.status === 200){
        localStorage.removeItem("user_id")
        localStorage.removeItem("session_token")
        return
      } else if(response.status === 401){
        throw "Not logged in"
      } else {
        throw "Something went wrong"
      }
    })
    .catch((error) => {
      console.log("Err", error)
      return Promise.reject(error)
    })
  }
}
