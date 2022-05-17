import { getAllTags } from "./TagManager"
import React, { useEffect, useState } from "react";
import { NewTagForm } from "./CreateTagForm";
import { useHistory } from "react-router-dom";
import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings";
export const AllTags = () => {

    const [tags, setTags] = useState([])
    const [toggle, setToggle] = useState(true)

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

    useEffect(
        () => {
            getAllTags().then(setTags)
        },
        [toggle]
    )
    const deleteTag = (id) => {
        return fetchIt(`${Settings.API}/tags/${id}`, "DELETE" )
    }

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
                {/* <button>edit</button> */}
                <button onClick={
                    (e) => {
                        // window.confirm('Are you sure you wish to delete this item?') ? onConfirm("confirm") : onCancel(history.push("/tags"))
                        // let text;
                        if (confirm("Are you sure you want to delete this?") == true) {
                            deleteTag(tag.id).then(() => {
                                setToggle(!toggle)
                            });
                        } else {
                            history.push("/tags");
                        }
                    }
                } className="submit-button">Delete</button>
                <button onClick={() => {
                    history.push({ pathname: `/tags/edit/${tag.id}` })
                    // setToggle!(toggle)
                }}>Edit</button>
            </div>
        })}


    </>
}