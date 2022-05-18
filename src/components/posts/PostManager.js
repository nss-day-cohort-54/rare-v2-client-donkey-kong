import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllPosts = () => fetchIt(`${Settings.API}/posts`)

export const getSinglePost = id => fetchIt(`${Settings.API}/posts/${id}`)

export const createPost = newPost => fetchIt(`${Settings.API}/posts`, "POST", newPost)

export const editPost = id => fetchIt(`${Settings.API}/posts/${id}`, "PUT", id)

export const deletePost = id => fetchIt(`${Settings.API}/posts/${id}`, "DELETE")

export const getUserPosts = id => fetchIt(`${Settings.API}/posts?user_id=${id}`)

export const getPostsByTag = id => fetchIt(`${Settings.API}/posts?tag_id=${id}`)

export const searchPostTitles = titleString => fetchIt(`${Settings.API}/posts?title=${titleString}`)

export const searchPostCategories = categoryId => fetchIt(`${Settings.API}/posts?category=${categoryId}`)