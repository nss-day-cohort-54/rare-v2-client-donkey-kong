// imports
// get all posts by user
// get subs by user
// post sub relationship
// delete sub relationship

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./User.css"
import { getSingleUser } from "./UserManager"
import { Link } from "react-router-dom"
import { SubForm } from "./SubForm"

// function that generates JSX for individual user element
export const User = ({ listView, user }) => {
    // probably want a prop that indicates whether 
    // content is being generated in a list vs individual page
    const [viewUser, setViewUser] = useState(user)
    const [postCount, setPostCount] = useState(0)
    const { userId } = useParams()

    useEffect(
        () => {
            if(!listView) {
                getSingleUser(userId)
                    .then(userData => setViewUser(userData))
            }
        }, [userId, listView]
    )

    useEffect(
        () => {
            if(viewUser) {
                let count = viewUser.user.posts?.length
                setPostCount(count)
            }
        }, [viewUser]
    )
        // define state variables
        // maybe get user's articles for the clickable article count?
        // articles, setArticles = useState()
        // subscribed, setSubscribed = useState(false) // default could be false

    // define useEffects
    // only needed for list view
    // useEffect(() => getArticlesForUser function then setArticles, [])

    /* useEffect(() => getSubscribedStatus)
        this useEffect can run on page load 
        needs to check if the viewing user is subscribed to the viewed user
        get subscribed list from database
            the database function should probably take id as param
            only returns subbed relationships of the viewing user
        iterate over the sub list 
            to check if viewed user is in the list
            if viewer is subbed to viewed setSubscribed state to true
    */
    // does subscribe button need an onclick?
        // yes
        // if subbed - onclick calls delete sub function
        // if not subbed - onclick calls add sub function

    return <>
        {listView 
            ? <div className="singleUser">
                <div>
                    <Link to={`/users/${user.user.id}`}>
                    {user.user.username}
                    </Link>
                </div>
                <div>{user.user.firstName}</div>
                <div>{user.user.lastName}</div>
                <div>{viewUser.user.isStaff ? "Author" : "Admin"}</div>
            </div> 
            : viewUser
                ? <div>
                    <div>Picture: <img src={`${viewUser.user.profileImageUrl || "https://m.media-amazon.com/images/I/91xDQaUMubS._AC_SL1500_.jpg"}`} width={300} height={300} /></div>
                    <div>Name: {viewUser.user.firstName} {viewUser.user.lastName}</div>
                    <div>Username: {viewUser.user.username}</div>
                    <div>Email: {viewUser.user.email}</div>
                    <div>Creation Date: {viewUser.user.createdOn}</div>
                    <div>Profile Type: {viewUser.user.isStaff ? "Author" : "Admin"}</div>
                    <div>
                        <Link to={`/posts/user/${viewUser.user.id}`}>
                        See Articles - Count: {postCount}
                        </Link>
                    </div>
                    <div>
                        <SubForm author={viewUser} />
                    </div>
                </div>
                : null
        }
    {/* 
        JSX for the individual user
            in list form - just need name and link to individual page

            in single view - see wireframe
                - image
                - first name last name
                - username
                - email
                - creation date
                - profile type
                - clickable article count
                - subscribe button - displays as either subscribe or unsubscribe
    */}
    
    </>
}