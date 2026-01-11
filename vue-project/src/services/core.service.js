const API_URL = 'http://localhost:3333'

function handleResponse(res) {
  if (!res.ok) {
    return res.json().then(err => Promise.reject(err))
  }
  return res.json()
}

export const coreService = {
  // Items
  searchItems() {
    return fetch(`${API_URL}/search`)
      .then(handleResponse)
  },

  //single item
  getItem(itemId) {
    return fetch(`${API_URL}/item/${itemId}`)
      .then(handleResponse)
  },

  // Bids on an item
  getBids(itemId) {
    return fetch(`${API_URL}/item/${itemId}/bid`)
      .then(handleResponse)
  },

  //place bid on an item
  placeBid(itemId, bidData) {
    return fetch(`${API_URL}/item/${itemId}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bidData)
    }).then(handleResponse)
  }
}
