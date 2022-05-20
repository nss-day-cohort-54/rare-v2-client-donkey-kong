import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReaction } from "./ReactionManager";

// define a function that returns the create new reaction form
export const NewReactionForm = ({ getReactions }) => {

    const [form, updateForm] = useState({ label: "", imageUrl: "" })
    const history = useHistory()

    const submitReaction = (e) => {
        e.preventDefault()
        const newReaction = {
            label: form.label,
            imageUrl: form.imageUrl
        }
        return createReaction(newReaction)
                .then(() => {
                    history.push("/reactions")
                })
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reaction">Reaction Name</label>
                    <input
                        required autoFocus
                        type="text" id="reaction"
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
                    <label htmlFor="reactionUrl">Reaction Image URL</label>
                    <input
                        required autoFocus
                        type="text" id="reactionUrl"
                        className="form-control"
                        placeholder="add text"
                        value={form.imageUrl}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.imageUrl = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                    <div className="submitButtonCreateNewReactionForm">

                        <button onClick={(e) => {
                            submitReaction(e)
                                .then(() => {
                                    updateForm({ label: "", imageUrl: "" })
                                    history.push("/reactions")
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