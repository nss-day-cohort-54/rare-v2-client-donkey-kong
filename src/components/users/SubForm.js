import { useEffect, useState } from "react"
import { addSub, deleteSub, editSub, getSubsForFollower } from "./SubManager"


export const SubForm = ({ author }) => {
    const [subbed, setSubbed] = useState(false)
    const [subs, setSubs] = useState([])
    const [currentSub, setCurrentSub] = useState({})
    const [currentUser, setCurrentUser] = useState(0)


    useEffect(
        () => {
            let userId = localStorage.getItem("userId")
            setCurrentUser(userId)
        },
        []
    )

    useEffect(
        () => {
            if (currentUser > 0) {
                getSubsForFollower(currentUser)
                    .then(subData => setSubs(subData))
            }
        }, [currentUser]
    )

    useEffect(() => {
        if (subs && subs.length > 0) {
            let isSubbed = false
            for (const sub of subs) {
                if (sub.author.id === author.id) {
                    isSubbed = true
                    setCurrentSub(sub)
                }
            }
            setSubbed(isSubbed)
        }
    }, [subs])

    const handleSub = (e) => {
        // debugger
        if (subbed) {
            editSub(currentSub)
                .then(setSubbed(false))
        } else {
            let userId = parseInt(currentUser)
            if (userId != author.id) {
                let new_subscription = {
                    followerId: parseInt(currentUser),
                    authorId: author.id
                }
                addSub(new_subscription)
                    .then(returnedSub => {
                        setCurrentSub(returnedSub)
                    })
                    .then(setSubbed(true))
            } 
            // if userId doesnt equal author id and c
            else {
                window.alert("You can't subscribe to yourself.")
            }
        }
    }

    return <div>
        {
            parseInt(currentUser) != author.id
                ? <button
                    className="subButton"
                    onClick={(e) => {
                        handleSub(e)
                    }}>
                    {subbed ? "Unsubscribe" : "Subscribe"}
                </button>
                : null
        }

    </div>
}