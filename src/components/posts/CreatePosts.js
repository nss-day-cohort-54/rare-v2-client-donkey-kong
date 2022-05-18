// imports React, useEffect, useSate, useHistory, sendPost, fetchTags
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllTags } from "../tags/TagManager";
import { createPost, editPost, getSinglePost } from "./PostManager";
import { getAllCategories } from "../categories/CategoryManager";
import { useParams } from "react-router-dom";



export const CreatePosts = ({ getPosts, editing }) => {
    const [form, updateForm] = useState({ label: "" })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const { postId } = useParams()
    const history = useHistory()


    useEffect(
        () => {
            getAllCategories().then(setCategories)
                .then(getAllTags().then(setTags))
        },
        []
    )

    useEffect(
        () => {
            if (editing) {
                getSinglePost(postId)
                    .then(updateForm)
            }
        }, []
    )

    const handleControlledInputChange = e => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPost = Object.assign({}, form)
        if (e.target.name === "tags") {
            if (!(e.target.name in newPost)) {
                newPost[e.target.name] = []
            }
            let val = parseInt(e.target.id)
            if (e.target.checked) {
                newPost[e.target.name].push(tags.find(tag => tag.id === val))
            } else {
                newPost[e.target.name] = newPost[e.target.name].filter(tag => tag.id !== val)
            }
        } else {
            newPost[e.target.name] = e.target.value
        }
        updateForm(newPost)
    }

    const submitPost = e => {
        e.preventDefault()
        let tagsToAdd = []
        if (form.tags && form.tags.length > 0) {
            tagsToAdd = form.tags.map(tag => tag.id)
        }
        const newPost = {
            userId: parseInt(localStorage.getItem("userId")),
            categoryId: form.categoryId,
            title: form.title,
            publicationDate: (new Date()).toISOString().split('T')[0],
            imageUrl: form.imageUrl,
            content: form.content,
            approved: 0,
            tags: tagsToAdd
        }
        if (newPost.title && newPost.imageUrl && newPost.categoryId && newPost.tags.length > 0) {
            if (editing) {
                newPost.id = parseInt(postId)
                return editPost(postId)
                    .then(() => history.push(`/posts/all`))
            } else {
                createPost(newPost)
                    .then(() => history.push(`/posts/all`))
            }
        } else {
            window.alert("Please finish filling out post form.")
        }
    }
    return (
        <>
            <fieldset>
                <div className="form-group">

                    <input
                        required
                        type="text" id="post"
                        className="form-control"
                        placeholder="Title"
                        value={form.title}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.title = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <input
                        required
                        type="text" id="post"
                        className="form-control"
                        placeholder="Image URL"
                        value={form.imageUrl}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.imageUrl = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <input
                        required
                        type="text" id="post"
                        className="form-control"
                        placeholder="Article Content"
                        value={form.content}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.content = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <select name="category"
                        onChange={(e) => {
                            const copy = { ...form }
                            copy.categoryId = parseInt(e.target.value)
                            updateForm(copy)
                        }}
                        defaultValue="0" value={form.categoryId}>
                        <option value="0" hidden>Category Select</option>
                        {
                            categories.map(
                                (c) => {
                                    return (
                                        <option key={`categoryId--${c.id}`} value={`${c.id}`}>
                                            {`${c.label}`}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>



            {tags.map(tag => {
                // logic to determine whether box should be pre-checked
                let checked_status = false
                if ("tags" in form) {
                    if (form.tags.length > 0) {
                        let found_tag = form.tags.find(t => t.id === tag.id)
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


            <div className="submitButtonCreateNewPostForm">
                <button onClick={(e) => {
                    submitPost(e)
                    updateForm({ title: "", imageUrl: "", content: "", categoryId: "0" })
                }} className="submit-button">
                    Submit
                </button>
            </div>
        </>
    )
}
