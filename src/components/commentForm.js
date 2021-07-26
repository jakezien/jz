import React, { useState, useContext } from "react"
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import { JgDatabaseContext } from './jgDatabaseContext'

const StyledDiv = styled.div`
  

  input, textarea {
    display: block;
    border: 2px solid #ddd;
    max-width: 100%;
    padding: 0.25em .5em;
    margin-bottom: .5em;
  }

  textarea {
    min-height: 4em;
    margin-bottom: 1em;
  }

  label {
    display: block;
  }

  button: {
    height:
  }
`

const CommentForm = (props) => {
  const [name, setName] = useState("")
  const [body, setBody] = useState("")

  const {addComment} = useContext(JgDatabaseContext);
  const {imageNode} = props

  const handleAddComment = async e => {
    e.preventDefault()
    addComment(imageNode, name, body)
    setName("")
    setBody("")
  }

  return (
    <StyledDiv>
      <form onSubmit={e => handleAddComment(e)}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required="required"
          />
        </label>
        <label htmlFor="comment">
          Comment
          <textarea
            id="comment"
            onChange={e => setBody(e.target.value)}
            value={body}
            name="comment"
            required="required"
            cols="45"
            rows="4"
          ></textarea>
        </label>
        <button type="submit" className="btn" aria-label="Submit your comment">
          Submit
        </button>
      </form>
    </StyledDiv>
  )
}

export default CommentForm