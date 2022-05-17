// fetch all the categories

import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllCategories = () => {
  return fetchIt(`${Settings.API}/categories`)
}