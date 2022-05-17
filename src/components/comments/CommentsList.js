// imports
// function that gets comments by postId
// function that deletes comments by commentId
// function that adds a comment
// Component for comment form

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import { getCommentsByPostId } from "./CommentManager"


// export component CommentList that is a single post's comments

// From Individual Post Component
// <CommentList postId={id} /> - displayed on a boolean
export const CommentList = ({ postId }) => {
    // declare state variable for comments array
    // const [comments, setComments] = useState([])
    const [comments, setComments] = useState([])
    // useEffect that pulls comments by postId
    const history = useHistory()
    useEffect(
        () => {
            if (postId) {
                getComments(postId)
            }
        },
        [postId]
    )
    /* 
        invoke function
        getCommentsByPostId()
            then set comments from returned data
            .then((comments) => setComments(comments))
        empty dependency array to run on page load
    */

    const getComments = (postId) => {
        getCommentsByPostId(postId)
            .then(setComments)
    }

    // any other functions?
    // deleteComment
    // takes commentId param
    // invokes fetch function deleteComment()

    // addComment
    // builds proper comment


    return <>
        comments
        {/* <CommentForm postId={postId} /> */}
        <div className="submitNewCommentButton">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: `/posts/single/${postId}/commentCreate` })

                }}
            >Submit a Comment</button>
        </div>
        {/* 
        map over comments and invoke comment component
        other needed JSX tags for styling
    */}
        {
            comments.map(comment => {
                let currentAuthor = comment.author?.user.id === parseInt(localStorage.getItem("userId"))
                return <div key={`comment--${comment.id}`}>
                    <Comment postId={postId} commentObject={comment} currentAuthor={currentAuthor} getComments={getComments} />
                </div>
            })
        }

    </>
}