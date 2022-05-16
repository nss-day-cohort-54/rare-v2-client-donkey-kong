// fetch all the tags

const API = 'http://localhost:8000'

export const getAllTags = () => {
  return fetch(`${API}/tags`, {
      headers: {
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
  })
      .then(r => r.json())
}
