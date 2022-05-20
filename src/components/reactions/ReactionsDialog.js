import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { useHistory } from "react-router-dom"
import { deleteCategory } from "../categories/CategoryManager"
import { useState, useEffect } from "react"
import { getAllReactions } from "./ReactionManager"
import "./ReactionDialog.css"

export const ReactionDialog = ({ }) => {
    // itemType should be a string - "post", "comment", or "tag"
    // comment needs postId as well to be able to get all the comments for the post
    // id is the id of the target item
    const [reactions, setReactions] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllReactions()
                .then(setReactions)
        }, []
    )

    return <div>
        {/* dialog box to handle confirmation */}

            <dialog id="reactionDialog">
                {/* interpolate the itemType */}
                <div>Click to add Reaction</div>
                <div id="reactionList">
                    {
                        reactions.map(reaction => {
                            return <div key={`reaction-${reaction.id}`}>
                                <img    
                                    onClick={()=> {
                                        
                                    }} 
                                    src={reaction.imageUrl}
                                    width="30px"
                                    height="30px" />
                            </div>
                        })
                    }
                </div>

                <div>
                    {/* ok button deletes the item and refreshes the list */}

                    {/* cancel button closes the dialog box */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            const buttonTarget = document.querySelector(`#reactionDialog`)
                            buttonTarget.close()
                        }}>
                        Cancel
                    </button>
                </div>
            </dialog>




        {/* delete icon opens delete confirm dialog box */}
        <button onClick={() => {
            const buttonTarget = document.querySelector("#reactionDialog")
            buttonTarget.showModal()
        }}>
            Add Reaction
        </button>
    </div >
}
