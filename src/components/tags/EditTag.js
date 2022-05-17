import { useHistory } from 'react-router-dom'
// import { updateGame } from './GameManager.js'
import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'


export const EditTagForm = () => {

    const [tag, assignTag] = useState([])
    const { tagId } = useParams()
    const history = useHistory() 
    useEffect(
        () => {
                fetch(`http://localhost:8000/tags/${tagId}`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
                    .then(r => r.json())
                    .then((data) => {
                        assignTag(data)
                    })
        }, [tagId]
    )






// stopped refactoring here







    // useEffect(() => {
    //     // TODO: Get the game types, then set the state
    //     getGameTypes().then(data => setGameTypes(data))
    // }, [])

    const changeTagState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...tag }
        copy[domEvent.target.name] = domEvent.target.value
        assignTag(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update tag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Label: </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        value={tag.label}
                        onChange={changeTagState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedTag = {
                        label: tag.label
                    }
                    


                    const updateTag = (tag) => {
                        const requestOptions = {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Token ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify(updatedTag)
                        };
                        return fetch(`http://localhost:8000/tags/${tagId}`, requestOptions)
                            // .then(response => response.json())
                    }


                    // Send POST request to your API
                    updateTag(updatedTag)
                        .then(() => history.push(`/tags`))
                }}
                className="btn btn-primary">Save</button>
                <button onClick={() => {
                    history.push({ pathname: `/tags` })
                    // setToggle!(toggle)
                }}>Cancel</button>
        </form>
    )
}