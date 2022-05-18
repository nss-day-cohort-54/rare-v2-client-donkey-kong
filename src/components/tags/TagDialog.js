import { getAllTags } from "./TagManager"
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSinglePost } from "../posts/PostManager";
import { Settings } from "../utils/Settings";
import { fetchIt } from "../utils/Fetch";
export const TagDialog = ({ toast }) => {
    const [tags, setTags] = useState([])
    const [post, setPost] = useState([])
    const { postId } = useParams()
    useEffect(() => {
        getAllTags().then(setTags)
    },
        [])
    useEffect(() => {

        getSinglePost(postId)
            .then((r) => {
                r.tags = r.tags.map((t) => {
                    return t.id
                })
                setPost(r)
            })
    },
        [])

    const handleControlledInputChange = e => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = Object.assign({}, post)
        if (!(e.target.name in newPost)) {
            newPost[e.target.name] = []
        }
        let val = parseInt(e.target.id)
        if (e.target.checked) {
            let yee = tags.find(tag => tag.id === val)
            newPost[e.target.name].push(yee.id)
        } else {
            newPost[e.target.name] = newPost[e.target.name].filter(tag => tag !== val)
        }
        setPost(newPost)
    }







    const updatePost = (post) => {
        return fetchIt(`${Settings.API}/posts/${postId}`, "PUT", post)
    }


    return <div>
        <dialog id="manageTag">
            {tags.map(tag => {
                // logic to determine whether box should be pre-checked
                let checked_status = false
                if ("tags" in post) {
                    if (post.tags.length > 0) {
                        let found_tag = post.tags.find(t => t === tag.id)
                        if (found_tag) {
                            checked_status = true
                        } else {
                            checked_status = false
                        }
                    } else {
                        checked_status = false
                    }
                }
                return <div key={`formTags-${tag.id}`} className="checkbox">
                    <input name="tags"
                        type="checkbox"
                        htmlFor="tag"
                        id={tag.id}
                        onChange={handleControlledInputChange}
                        checked={checked_status}
                    />
                    <label htmlFor={tag.id}>{tag.label}</label>
                </div>
            })
            }
            <button onClick={() => {
                const buttonTarget = document.querySelector(`#manageTag`)
                buttonTarget.close()
            }}>Cancel</button>
            <button onClick={() => {
                const buttonTarget = document.querySelector(`#manageTag`)
                updatePost(post)
                    .then(toast)
                buttonTarget.close()
            }}>Save</button>
        </dialog>
        <button onClick={() => {
            const buttonTarget = document.querySelector(`#manageTag`)
            buttonTarget.showModal()
        }}>Manage Tags</button>
    </div>
}