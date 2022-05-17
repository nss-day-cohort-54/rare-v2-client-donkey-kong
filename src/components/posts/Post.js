import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { CommentList } from "../comments/CommentsList"
import "./Post.css"
import { deletePost } from "./PostManager"
// function that renders a single post
export const Post = ({ listView, cardView, post }) => {

    const [showComments, setShowComments] = useState(false)
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("userId"))

    const date = post.publicationDate
    const [year, month, day] = date.split('-')
    const dateFormat = [month, day, year].join('-')

    return <>
        {/* Content needed in all posts list */}
        {/* Title, Author, Date, Category, Tags */}
        {
            listView && cardView
                ? <div key={`post--${post.id}`} className="postCard">
                    <div className="cardTitle">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                        </div>
                        <div>Created on:{`${post.publicationDate}`}</div>
                    </div>
                    <div className="cardImage">
                        <img src={`${post.imageUrl || "https://picsum.photos/300/100"}`} />
                    </div>
                    <div className="cardBottom">
                        <div>Author: {post.rareUser.user.firstName} {post.rareUser.user.lastName}</div>
                        <div className="cardFunctions">
                            <div>Reaction Count: 0</div>
                            {
                                post.userId === currentUser
                                    ? <div className="cardButtons">
                                        <ButtonControls itemType={"post"} id={post.id} />
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                : listView
                    ? <div key={`post--${post.id}`} className="singlePost">
                        <div>
                            <Link to={`/posts/single/${post.id}`}>
                                {post.title}
                            </Link>
                            {
                                post.userId === currentUser
                                    ? <ButtonControls itemType={"post"} id={post.id} />
                                    : null
                            }
                        </div>
                        <div>{post.rareUser.user.firstName} {post.rareUser.user.lastName}</div>
                        <div>{post.publicationDate}</div>
                        <div>{post.category.label}</div>
                        <div>{post.tags.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div>
                    </div>
                    : <div key={`post--${post.id}`} className="postDetails">
                        <div className="postDetailsMain">
                            <div className="postDetailsTitle">
                                <div className="cardButtons">
                                    {
                                        post.userId === currentUser
                                            ? <ButtonControls itemType={"post"} id={post.id} />
                                            : null
                                    }
                                </div>
                                <div>{post.title}</div>
                                <div>{post.category.label}</div>
                            </div>
                            <div><img src={`${post.imageUrl || "https://picsum.photos/300/100"}`} /></div>
                            <div className="postDetailsBelowCard">
                                <div>By <Link to={`/users/${post.userId}`} >
                                    {post.rareUser.user.username}
                                </Link>
                                </div>
                                {
                                    showComments
                                        ? <button onClick={() => { setShowComments(false) }}>Show Post</button>
                                        : <button onClick={() => setShowComments(true)}>View Comments</button>
                                }
                                <div>Reactions</div>
                            </div>
                            {
                                showComments
                                    ? <CommentList postId={post.id} />
                                    : <div>{post.content}</div>
                            }
                        </div>
                        <div className="postDetailsTags">{post.tags.map(tag => <div key={`posttag${post.id}${tag.id}`}>{tag.label}</div>)}</div>
                        <div>Created on:{`${dateFormat}`}</div>
                        {
                            currentUser === post.rareUser.user.id ?
                                <button
                                    onClick={
                                        () => {
                                            deletePost(post.id)
                                                .then(
                                                    () => {
                                                        history.push("/posts")
                                                    }
                                                )
                                        }
                                    }
                                >
                                    Delete
                                </button>
                                :
                                <button>fail</button>
                        }
                    </div>


        }
        {/* Content needed in card view */}
        {/* Title, Image, Author Name (not username), Publication date, reaction count */}
        {/* Content needed in post details */}
        {/* Title, category, tags, content, username, image, reactions */}
    </>
}