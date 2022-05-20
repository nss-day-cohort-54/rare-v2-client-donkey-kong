// fetch all the tags
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllTags = () => fetchIt(`${Settings.API}/tags`)