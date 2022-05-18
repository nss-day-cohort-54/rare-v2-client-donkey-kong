// imports
// import { User } from "./User"
// get all users fetch
import { useEffect, useState } from "react"
import { User } from "./User"
import { getAllUsers } from "./UserManager"

// function that generates list of users
// invokes User function from User.js for each user
export const UserList = () => {
    // define needed state variables
    // users, setUsers = useState()
    const [rareUsers, setRareUsers] = useState([])

    // define needed useEffects
    // useEffect(() => getUsers function and set as users state variable, [])
    useEffect(() => {
        getAllUsers()
            .then(rareUserData => {
                setRareUsers(rareUserData)
            })
    }, [])
    // define needed functions
    // will the users have any buttons?
    // user links to individual pages probably don't need buttons/history.push()
    // can just be <Link> tags

    // return jsx
    return <>
        <div className="singleUser">
        </div>
        {
            rareUsers.map(rareUser => {

                return <div>
                    <div>{rareUser.user?.username}</div>
                    <div>{rareUser.user?.firstName}</div>
                    <div>{rareUser.user?.lastName}</div>
                    <div>User Type: {rareUser.user?.isStaff ? "Admin" : "Author" } </div>
                    {/* <div key={`user-${user.id}`}>
                        <User user={user} listView={true} />
                    </div> */}
                </div>
            })
        }
        {/* 
        map over users and invoke <User /> component for each
        add any other jsx tags as needed for styling
    */}

    </>
}