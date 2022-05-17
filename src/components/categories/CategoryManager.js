// fetch all the categories

import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllCategories = () => fetchIt(`${Settings.API}/categories`)