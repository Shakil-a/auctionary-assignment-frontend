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

export const questionService = {
    //get all questions on an item
  getQuestions(itemId) {
    return fetch(`${API_URL}/item/${itemId}/question`)
      .then(parseResponse)
  },

  //ask question on an item
  askQuestion(itemId, questionData) {
    return fetch(`${API_URL}/item/${itemId}/question`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Authorization': localStorage.getItem("session_token")
       },
      body: JSON.stringify(questionData)
    }).then(parseResponse)
  },

  answerQuestion(questionId, answerData) {
    return fetch(`${API_URL}/question/${questionId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Authorization': localStorage.getItem("session_token") 
      },
      body: JSON.stringify(answerData)
    }).then(parseResponse)
  }
}
