// fetch all the reactions
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllReactions = () => fetchIt(`${Settings.API}/reactions`)

export const createReaction = (reaction) => {
    return fetchIt(`${Settings.API}/reactions`, "POST", reaction)
}

export const getPostReactions = (postId) => {
    return fetchIt(`${Settings.API}/postReactions?post=${postId}`)
}

export const createPostReaction = (postReaction) => {
    return fetchIt(`${Settings.API}/postReactions`, "POST", postReaction)
}

export const removePostReaction = (id) => {
    return fetchIt(`${Settings.API}/postReactions/${id}`, "DELETE")
}