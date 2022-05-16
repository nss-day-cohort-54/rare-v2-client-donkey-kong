// fetch all the tags

import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// const API = 'http://localhost:8000'

// export const getAllTags = () => {
//   return fetch(`${API}/tags`, {
//       headers: {
//           "Authorization": `Token ${localStorage.getItem("lu_token")}`
//       }
//   })
//       .then(r => r.json())
// }

export const getAllTags = () => fetchIt(`${Settings.API}/tags`)