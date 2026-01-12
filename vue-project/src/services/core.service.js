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

export const coreService = {
  // Items
  searchItems() {
    return fetch(`${API_URL}/search`)
      .then(parseResponse)
  },

  //single item
  getItem(itemId) {
    return fetch(`${API_URL}/item/${itemId}`)
      .then(parseResponse)
  },

  // Bids on an item
  getBids(itemId) {
    return fetch(`${API_URL}/item/${itemId}/bid`)
      .then(parseResponse)
  },

  //place bid on an item
  placeBid(itemId, bidData) {
    return fetch(`${API_URL}/item/${itemId}/bid`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Authorization': localStorage.getItem("session_token")
       },
      body: JSON.stringify(bidData)
    }).then(parseResponse)
  },

  createItem(itemData) {
    return fetch(`${API_URL}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': localStorage.getItem("session_token") // must be logged in
      },
      body: JSON.stringify(itemData)
    }).then(parseResponse)
  }
}
