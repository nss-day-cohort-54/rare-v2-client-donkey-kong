import { getAllPosts, deletePost, searchPostCategories, searchPostTitles, getPostsByTag, editPost } from "./PostManager"
import { getUserPosts } from "./PostManager"
import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import { getAllUsers } from "../users/UserManager"
import { getAllTags } from "../tags/TagManager";
import { getAllCategories } from "../categories/CategoryManager";
import { Settings } from "../utils/Settings";
import { getSingleUser } from "../users/UserManager";
import { useHistory } from "react-router-dom";
import useAdminCheck from "../utils/useAdminCheck";
import { ButtonControls } from "../buttonControls/ButtonControls";


export const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [toggle, setToggle] = useState(true)
    const [categories, setCategories] = useState([])
    const [filter, setFilterType] = useState({ type: "all", value: "" })
    const currentUser = parseInt(localStorage.getItem('userId'))
    // const [adminCheck, setAdminCheck] = useState([])
    const history = useHistory()
    const { adminCheck2 } = useAdminCheck()
    // useEffect(
    //     () => {
    //         getAllUsers()
    //             .then(setUsers)
    //     },
    //     []
    // )

    // useEffect(
    //     () => {
    //         getSingleUser(currentUser)
    //             .then(r => setAdminCheck(r))
    //     },
    //     []
    // )
    useEffect(
        () => {
            getAllPosts().then(
                setPosts
            )
        },
        [toggle]
    )

    useEffect(
        () => {
            getAllTags()
                .then(setTags)
        },
        []
    )

    useEffect(
        () => {
            getAllCategories()
                .then(setCategories)
        },
        []
    )

    useEffect(() => {
        if (filter.type === "all") {
            getAllPosts()
                .then((posts) => {
                    setPosts(posts)
                })
        }
        // } else if (filter.type === "title") {
        //     searchPostTitles(filter.value)
        //         .then(setPosts)
        // } else if (filter.type === "category") {
        //    searchPostCategories(filter.value)
        //         .then(setPosts)
        // } 
        //   // run category filter fetch with value
        //   else if (filter.type === "user") {
        //     getUserPosts(filter.value)
        //         .then(setPosts)
        //     // run user filter fetch with value
        // } else if (filter.type === "tag") {
        //     getPostsByTag(filter.value)
        //         .then(setPosts)
        //     // run tag filter fetch with value
        // }
    }, [filter])

    // useEffect that updates posts, [searchButton]
    return <>
        {/* filter by title jsx */}
        {/* <fieldset id="titleSearchField">
            <div className="titleSearch">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title..."
                />
                <button className='button' onClick={e => {
                    e.preventDefault()
                    let filterToSet = {
                        type: "title",
                        value: e.currentTarget.previousElementSibling.value
                    }
                    setFilterType(filterToSet)
                }}>
                    <label htmlFor="searchButton">Search</label>
                </button>
            </div>
        </fieldset> */}
        {/* filter by category jsx */}

        {/* <fieldset>
            <select
                className="categoryDropdown"
                name="categoryId"
                value={filter.type === "category" ? filter.value : "0"}
                onChange={e => {
                    e.preventDefault()
                    if(e.target.value != "0") {
                        let copy = JSON.parse(JSON.stringify(filter)) 
                        copy.type = "category"
                        copy.value = e.target.value
                        setFilterType(copy)
                    }
                }}
            >
                <option name="categoryId" hidden value="0">
                    Filter By Category
                </option>
                {categories?.map((c) => {
                    return (
                        <option key={c.id} name="CategoryId" value={c.id}>
                            {c.label}
                        </option>
                    );
                })}
            </select>
        </fieldset> */}


        {/* filter by user jsx */}
        {/* <fieldset id="authorDropdown">
            <select
                className="authorDropdown"
                name="authorId"
                value={filter.type === "user" ? filter.value : "0"}
                onChange={e => {
                    e.preventDefault()
                    if(e.target.value != "0") {
                        let copy = JSON.parse(JSON.stringify(filter)) 
                        copy.type = "user"
                        copy.value = e.target.value
                        setFilterType(copy)
                    }
                }}
            >
                <option name="authorId" hidden value="0">
                    Author...
                </option>
                {users?.map((user, index) => {
                    return (
                        <option key={index} name="AuthorId" value={user.id}>
                            {user.username}
                        </option>
                    );
                })}
            </select>
        </fieldset> */}
        {/* filter by tag jsx */}
        {/* <fieldset>
            <select
                className="tagDropdown"
                name="tagId"
                value={filter.type === "tag" ? filter.value : "0"}
                onChange={e => {
                    e.preventDefault()
                    let copy = JSON.parse(JSON.stringify(filter)) 
                    copy.type = "tag"
                    copy.value = e.target.value
                    setFilterType(copy)
                }}
            >
                <option name="tagId" hidden value="0">
                    Filter By Tag
                </option>
                {tags?.map((t) => {
                    return (
                        <option key={t.id} name="TagId" value={t.id}>
                            {t.label}
                        </option>
                    );
                })}
            </select>
        </fieldset> */}

        <div className="singlePost">
            <div>Title</div>
            <div>Author</div>
            <div>Publication Date</div>
            <div>Category</div>
            <div>Tags</div>
        </div>
        {
            posts.length > 0
                ? posts.map((post) => {
                    let checked_status = false
                    if (post.approved) {
                        // debugger
                        checked_status = true
                    } else {
                        checked_status = false
                    }
                    return <div key={post.id} className="posts">
                        {adminCheck2 ?
                            <fieldset>
                                <input name="approval"
                                    type="checkbox"
                                    htmlFor="approval"
                                    id={post?.id}
                                    onChange={
                                        (e) => {

                                            if (e.target.checked) {
                                                post.approved = 1
                                            } else {
                                                post.approved = 0
                                            }
                                            editPost(post.id, post)
                                                .then(setToggle(!toggle))

                                        }
                                    }
                                    checked={checked_status}
                                />
                                <label htmlFor={post.id}>{post.approved ? "approved" : 'awaiting approval'}</label>
                            </fieldset>
                            : null
                        }

                        {
                            currentUser === post.rareUser.user?.id || adminCheck2 ?
                                <ButtonControls itemType={"post"} postId={post.id} id={post.id} />
                                :
                                ""
                        }
                        <Post listView={true} cardView={false} post={post} />
                    </div>
                })
                : "No posts"
        }
    </>
}

// ADD INTO RETURN STATEMENT ABOVE
// delete button COMPLETE
// onclick COMPLETE
// prompts with "Are you sure you want to delete this post?" alert window COMPLETE
// Alert window "Ok" button COMPLETE
// Alert window "Cancel" button COMPLETE

// edit button
// onclick
// Links to "Author Edit Post" page

// add post button
// onclick
// Links to "Author My Posts" page

//search field


// currentUser -> compared to user.id -> check is_staff