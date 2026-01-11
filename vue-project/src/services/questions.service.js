const API_URL = 'http://localhost:3333'

function handleResponse(res) {
  if (!res.ok) {
    return res.json().then(err => Promise.reject(err))
  }
  return res.json()
}

export const questionService = {
    //get all questions on an item
  getQuestions(itemId) {
    return fetch(`${API_URL}/item/${itemId}/question`)
      .then(handleResponse)
  },

  //ask question on an item
  askQuestion(itemId, questionData) {
    return fetch(`${API_URL}/item/${itemId}/question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData)
    }).then(handleResponse)
  }
}
