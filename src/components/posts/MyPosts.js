import { useState, useEffect } from "react"
import { Post } from "./Post"
import { getUserPosts } from "./PostManager"
import { Settings } from "../utils/Settings"

export const MyPosts = () => {
    const currentUser = parseInt(localStorage.getItem("userId"))
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getUserPosts(currentUser)
                .then(setPosts)
        },
        []
    )

    return <>
        {
            posts.map(post => {
                return <div key={`post-${post.id}`}>
                    <Post listView={true} cardView={true} post={post} />
                    <div className="btn-delete">
                        <button className="btn-deleteMyPost"
                            onClick={
                                () => {
                                    if (confirm("Are you sure you want to delete this?") == true) {
                                        deletePost(post.id)
                                            .then(
                                                () => {
                                                    history.push("/posts/all")
                                                }
                                            )
                                    } else {
                                        () => {
                                            history.push(`/posts/single/${post.id}`)
                                        }
                                    }
                                }
                            }
                        >
                            <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
                        </button>
                    </div>
                </div>
            })
        }
    </>
}