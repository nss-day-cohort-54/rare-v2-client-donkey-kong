import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"
import { getAllTags } from "./TagManager";
// define a function that returns the create new tag form
export const NewTagForm = ({ getTags }) => {

    const [form, updateForm] = useState({ label: "" })
    const history = useHistory()

    const submitTag = (e) => {
        e.preventDefault()
        const newTag = {
            label: form.label,
        }
        return fetchIt(`${Settings.API}/tags`, "POST", newTag)
            .then(getTags)
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Create a new tag</label>
                    <input
                        required autoFocus
                        type="text" id="tag"
                        className="form-control"
                        placeholder="add text"
                        value={form.label}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.label = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                    <div className="submitButtonCreateNewTagForm">

                        <button onClick={(e) => {
                            submitTag(e)
                                .then(() => {
                                    updateForm({ label: "" })
                                    history.push("/tags")
                                })
                        }} className="submit-button">
                            Submit
                        </button>
                    </div>
                </div>
            </fieldset>
        </>
    )
}