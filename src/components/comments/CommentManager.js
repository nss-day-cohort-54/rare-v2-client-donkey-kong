import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// getCommentsByPostId
export const getCommentsByPostId = (postId) => {
    return fetchIt(`${Settings.API}/comments?post=${postId}`)
}

// Get single comment
export const getCommentById = (commentId) => {
    return fetchIt(`${Settings.API}/comments/${commentId}`)
}

// deleteComment
export const deleteComment = (commentId) => {
    return fetchIt(`${Settings.API}/comments/${commentId}`, "DELETE")
}


// addComment
export const addComment = (newComment) => {
    return fetchIt(`${Settings.API}/comments`, "POST", newComment)
}

export const updateComment = (comment) => fetchIt(`${Settings.API}/comments/${comment.id}`, "PUT", comment)