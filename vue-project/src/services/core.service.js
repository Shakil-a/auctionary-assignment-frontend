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
 searchItems(params = {}) {
  const query = new URLSearchParams();

  // Always include q (even empty)
  query.append('q', params.q ?? '');

  // Include status if set
  if (params.status) query.append('status', params.status);

  // Pagination
  query.append('limit', params.limit ?? 20);
  query.append('offset', params.offset ?? 0);

  // Token header (used automatically for OPEN, ARCHIVE, BID)
  const token = localStorage.getItem("session_token");

  return fetch(`${API_URL}/search?${query.toString()}`, {
    headers: {
      ...(token ? { 'X-Authorization': token } : {}),
    },
  }).then(parseResponse);
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
