import { getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
import { useHistory } from "react-router-dom";
export const AllTags = () => {

    const [tags, setTags] = useState([])
    // const [toggle, setToggle] = useState(true)

    const getTags = () => {
        return getAllTags()
                .then((tags => {
                    setTags(tags)
                }))
    }
    const history = useHistory()

    useEffect(() => {
        getAllTags().then(setTags)
    },
        [])

    // useEffect(
    //     () => {
    //         getAllTags().then(setTags)
    //     },
    //     [tags]
    // )

    return <>
        <div>AllTags Page</div>
        <div className="CreateNewTagFormContainer">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/tags/new" })
                    // setToggle!(toggle)
                }}
            >Create New Tag</button>
        </div>
        {tags.map((tag) => {
            return <div key={`tag--${tag.id}`}>{tag.label}
                <button>edit</button> <button>delete</button>
            </div>
        })}


    </>
}