import { Settings } from "../utils/Settings"
import { deleteComment } from "../comments/CommentManager"
import { deletePost } from "../posts/PostManager"
import { useHistory } from "react-router-dom"

export const ButtonControls = ({ itemType, postId, id, getComments }) => {
  // itemType should be a string - "post", "comment", or "tag"
  // comment needs postId as well to be able to get all the comments for the post
  // id is the id of the target item

  const history = useHistory()

  return <div>
    {/* dialog box to handle confirmation */}
    <dialog id={`${itemType}-${id}`}>
      {/* interpolate the itemType */}
      <div>Are you sure you want to delete this {`${itemType}`}?</div>

      <div>
        {/* ok button deletes the item and refreshes the list */}
        <button onClick={(e) => {
          e.preventDefault()
          switch (itemType) {
            case "post":
              deletePost(id)
                .then(
                  () => {
                    history.push("/")
                  })
              break;
            case "comment":
              deleteComment(id)
                .then(
                  () => {
                    getComments(postId)
                  })
                .then(
                  () => {
                    const buttonTarget = document.querySelector(`#${itemType}-${id}`)
                    buttonTarget.close()
                  }
                )
              break;
            case "tag":

              break;

            default:
              break;
          }
        }}>
          Okay
        </button>
        {/* cancel button closes the dialog box */}
        <button
          onClick={(e) => {
            e.preventDefault()
            const buttonTarget = document.querySelector(`#${itemType}-${id}`)
            buttonTarget.close()
          }}>
          Cancel
        </button>
      </div>
    </dialog>

    {/* edit icon routes to editing the item */}
    <button onClick={() => {
      switch (itemType) {
        case "post":
          history.push(`/editPost/${postId}`)

          break;
        case "comment":
          window.alert("Cannot edit comments")

          break;
        case "tag":
          break;
        default:
          break;
      }
    }}>
      <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
    </button>

    {/* delete icon opens delete confirm dialog box */}
    <button onClick={() => {
      const buttonTarget = document.querySelector(`#${itemType}-${id}`)
      buttonTarget.showModal()
    }}>
      <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
    </button>
  </div >
}

