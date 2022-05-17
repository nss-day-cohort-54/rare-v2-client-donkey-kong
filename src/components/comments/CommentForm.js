// imports
// addComment from CommentManager
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { addComment, getCommentById, getCommentsByPostId, updateComment } from "./CommentManager"
import { useHistory } from "react-router-dom"

// export function that handles comment form entry
export const CommentForm = () => {
    // declare state variable for comment to add
    const [newComment, setComment] = useState("")
    const {postId,commentId} = useParams()
    
        // should have values
        // post id
        // author of comment id (current user)
        // content
    
    // function to handle comment submission

    const history = useHistory()

    const editMode = commentId ? true : false
    

    useEffect(() => {
        if (editMode) {
            getCommentById(commentId).then((res) => {
                setComment(res.content)
            })
        }
    },[])


    const submitComment = () => {
        if (newComment.length === 0) {
            window.alert("Please fill out your comment before submitting.")
        } else {
            const copy = {}
            copy.content = newComment
            // gets comment content from state
            // adds postId
            copy.postId = postId
            copy.authorId = parseInt(localStorage.getItem("userId"))
            if (editMode) {
                copy.id = commentId
                updateComment(copy)
                    .then(() => history.push(`/posts/single/${postId}`))
            } else {
                addComment(copy)
                    .then(() => history.push(`/posts/single/${postId}`))
            }
        }
    }
    //     if(newComment.length > 0) {
            
    //         const copy = {}
    //         copy.content = newComment
    //         // gets comment content from state
    //         // adds postId
    //         copy.postId = postId
    //         copy.authorId = parseInt(localStorage.getItem("userId"))
    //         // adds current user id
    //         // sends to database using function from CommentManager
    //         if (editMode){
    //         updateComment(copy)
    //         then(() => setComment(""))
    //         .then(() => getCommentsByPostId(postId))
    //         } else addComment(copy)
    //         .then(() => setComment(""))
    //         .then(() => getCommentsByPostId(postId))
    //         // refresh comment list
    //     } else {
    //         window.alert("Please fill out your comment before submitting.")
    //     }
    // }
    return <>
        {/* 
            textarea form input
            button to submit comment
        */}
        <label htmlFor="content">Add a Comment:</label>
        <textarea id="content" name="content"
                    onChange={(e) => setComment(e.target.value)}
                    value={newComment}>
        </textarea>
        <button className="commentSubmit" onClick={() => submitComment()}>
            Submit Comment
        </button>
    </>
}