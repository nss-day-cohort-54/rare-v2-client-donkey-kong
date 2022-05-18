// imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"
import { getSingleCategory } from "./CategoryManager";

// def a function that will return a new category category

export const NewCategoryForm = ({ editing }) => {

    const [category, updateCategory] = useState({ label: "" })
    const history = useHistory()
    const {categoryId} = useParams()

    // const [category, updateCategory] = useState()

    useEffect(() => {
        if(editing) {
            getSingleCategory(categoryId)
                .then(updateCategory)
        }
        }, []
    )

    const submitNewCategory = (e) => {
        e.preventDefault()
        const newCategory = {
            label: category.label,
        }
        if(editing) {
            return fetchIt(`${Settings.API}/categories/${categoryId}`, "PUT", newCategory)
                .then(() => history.push("/categories"))
        }
        return fetchIt(`${Settings.API}/categories`, "POST", newCategory)
            .then(() => history.push("/categories"))
    }


    return (
        <>
            <fieldset>
                <div className="category-group">
                    <label htmlFor="category">Create a new category</label>
                    <input
                        required autoFocus
                        type="text" id="category"
                        className="category-control"
                        placeholder="add text"
                        value={category.label}
                        onChange={
                            (e) => {
                                const copy = { ...category }
                                copy.label = e.target.value
                                updateCategory(copy)
                            }
                        }
                    />
                    <div className="submitButtonCreateNewCategoryForm">

                        <button onClick={(e) => {
                            submitNewCategory(e)
                            .then(() => {
                                updateCategory({ label: "" })
                            })
                        }} className="submit-button">
                            Submit
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                history.push("/categories")
                            }}>
                            Back to Category List
                        </button>
                    </div>
                </div>
            </fieldset>
        </>
    )
}
