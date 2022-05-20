// fetch all the reactions
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllReactions = () => fetchIt(`${Settings.API}/reactions`)

export const createReaction = (reaction) => {
    return fetchIt(`${Settings.API}/reactions`, "POST", reaction)
}