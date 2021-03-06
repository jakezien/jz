import React, { useState } from "react"
import styled from "styled-components"
import { firestore } from "../../firebase.js"

const CommentBox = styled.div`
  

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

const CommentForm = ({ filename }) => {
  let storedData;
  if (typeof window !== "undefined") {
    storedData = JSON.parse(localStorage?.getItem(filename))
    // console.log('storedData', JSON.parse(localStorage?.getItem(filename)))
  }

  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [commentIds, setCommentIds] = useState(storedData?.comments)

  const handleCommentSubmission = async e => {
    e.preventDefault()
    let comment = {
      name: name,
      body: body,
      time: new Date(),
    }
    setName("")
    setBody("")
    // console.log(comment)

    let ref = await firestore
    .collection(`jgPosts/${filename}/comments`)
    .add(comment)
    .catch(err => console.error)

    await firestore
    .collection(`jgPosts`)
    .doc(filename)
    .set({create: 'create'})
    .catch(err => console.error)

    setCommentIds(commentIds ? [ref.id, ...commentIds] : [ref.id])
    updateLocalStorage(ref.id)
  }

  const updateLocalStorage = (id) => {
    let newData = {
      comments: commentIds ? [id, ...commentIds] : [id]
    }
    let mergedData = {...storedData, ...newData}
    console.log(mergedData)
    if (typeof window !== "undefined") {
      localStorage?.setItem(filename, JSON.stringify(mergedData))
      storedData = JSON.parse(localStorage?.getItem(filename))
    }
  }

  return (
    <CommentBox>
      <form onSubmit={e => handleCommentSubmission(e)}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
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
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </CommentBox>
  )
}

export default CommentForm