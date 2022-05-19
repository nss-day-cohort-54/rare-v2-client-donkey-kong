import { useHistory } from "react-router-dom"

export const ReactionList = () => {
    const history = useHistory()

    return <div>
        <button onClick={() => {
            history.push("/reactions/new")
        }}>Create Reaction</button>
        <div>
            Reaction List
        </div>
        </div>
}