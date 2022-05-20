
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { createPostReaction, getAllReactions, getPostReactions, removePostReaction } from "./ReactionManager"
import "./ReactionDialog.css"

export const ReactionDialog = ({ postId }) => {
    // itemType should be a string - "post", "comment", or "tag"
    // comment needs postId as well to be able to get all the comments for the post
    // id is the id of the target item
    const [reactions, setReactions] = useState([])
    const [postReactions, setPostReactions] = useState([])
    const history = useHistory()

    const refreshPostReactions = () => {
        getPostReactions(postId)
            .then(setPostReactions)
    }

    useEffect(
        () => {
            getAllReactions()
                .then(setReactions)
                .then(() => refreshPostReactions())

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
                        let found_post_reactions = postReactions.find(pr => {
                            const checkUser = pr.rareUser.id === parseInt(localStorage.getItem("userId"))
                            const checkReaction = pr.reaction.id === reaction.id
                            if(checkUser && checkReaction){
                                return pr
                            }
                            return false
                        })
                        return <div key={`reaction-${reaction.id}`}
                            className={found_post_reactions ? "reactionSelected" : ""}>
                            <img
                                onClick={() => {
                                    if (found_post_reactions) {
                                        removePostReaction(found_post_reactions.id)
                                            .then(() => refreshPostReactions())
                                    } else {
                                        createPostReaction({
                                            postId: postId,
                                            reactionId: reaction.id
                                        })
                                            .then(() => refreshPostReactions())
                                    }
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
        <div id="reactionList">
            {
                reactions.map(reaction => {
                    let found_postReactions = postReactions.filter(pr => pr.reaction.id === reaction.id)
                    return <>
                    {found_postReactions?.length > 0
                    ? <div key={`reaction-${reaction.id}`}>
                        <div>
                        {`${found_postReactions?.length}`}
                        </div>
                        <img
                            src={reaction.imageUrl}
                            width="30px"
                            height="30px" />
                    </div>
                    : null}
                    </>
                })
            }
        </div>
    </div >
}
