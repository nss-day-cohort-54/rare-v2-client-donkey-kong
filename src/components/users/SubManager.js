import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// get all subs by user id
export const getSubsForFollower = (followerId) => {
    return fetchIt(`${Settings.API}/subscriptions?follower=${followerId}`)
}

// post new sub relationship
export const addSub = (new_sub) => {
    return fetchIt(`${Settings.API}/subscriptions`, "POST", new_sub)
}
// delete sub relationship
export const deleteSub = (subId) => {
    return fetchIt(`${Settings.API}/subscriptions/${subId}`, "DELETE")
}
export const editSub = (sub) => fetchIt(`${Settings.API}/subscriptions/${sub.id}`, "PUT", sub)