import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllReactions } from "./ReactionManager"
import { Settings } from "../utils/Settings"

export const ReactionList = () => {
    const [reactions, setReactions] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllReactions()
                .then(setReactions)
        }, []
    )

    return <div>
        <button onClick={() => {
            history.push("/reactions/new")
        }}>Create Reaction</button>
        <div>
            {
                reactions.map(reaction => {
                    return <div key={`reaction-${reaction.id}`}>
                        <div>{reaction.label}</div>
                        <img src={reaction.imageUrl} width="50px" height="50px"/>
                    </div>
                })
            }
        </div>
    </div>
}