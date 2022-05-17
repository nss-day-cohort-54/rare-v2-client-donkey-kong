import { getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
export const TagDialog = () => {
    const [tags, setTags] = useState([])
    useEffect(() => {
        getAllTags().then(setTags)
    },
        [])
    return <div>
        <dialog id="manageTag">
            {
                tags.map((t) => {
                    return <>
                    <input type="checkbox">{t.label}</input>
                    {/* <h1>{t.label}</h1> */}
                    </>
                })
            }
<button onClick = {() => {
            const buttonTarget = document.querySelector(`#manageTag`)
            buttonTarget.close()
        }}>Cancel</button>
        </dialog>
        <button onClick = {() => {
            const buttonTarget = document.querySelector(`#manageTag`)
            buttonTarget.showModal()
        }}>Manage Tags</button>
    </div>
}