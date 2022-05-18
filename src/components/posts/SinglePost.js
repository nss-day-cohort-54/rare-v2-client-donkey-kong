import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Post } from "./Post"
import { getSinglePost } from "./PostManager"


export const SinglePost = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()

    const toast = () => {
        if (postId) {
            getSinglePost(postId)
                .then(setPost)
        }
    }

    useEffect(
        () => {
            toast()
        },
        [postId]
    )

    return <>
        {
            post.title
                ? <Post listView={false} cardView={false} post={post} toast={toast} />
                : "loading"
        }
    </>
}