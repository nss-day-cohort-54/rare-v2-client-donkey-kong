// fetch all the categories

import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

export const getAllCategories = () => {
  return fetchIt(`${Settings.API}/categories`)
}

export const editCategory = (newCategory) => {
  return fetchIt(`${Settings.API}/categories/${newCategory.id}`, "PUT", newCategory)
}

export const createCategory = (newCategory) => {
  return fetchIt(`${Settings.API}/categories`, "POST", newCategory)
}

export const deleteCategory = (id) => {
  return fetchIt(`${Settings.API}/categories/${id}`, "DELETE")
}