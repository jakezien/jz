import React, {useEffect, useState} from "react"
import moment from 'moment'
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import { rhythm } from "../utils/typography"
import CommentForm from "./commentForm"

const StyledDiv = styled.div`

  .grid & {
    display: none
  }
`

const ImageComments = ({image}) => {
  let filename = image?.name
  const [comments, setComments] = useState([])

  const storedData = localStorage.getItem(filename)
  // console.log('storedData', storedData)
  
  useEffect(() => {
    const cleanUp = firestore
      .collection(`jgPosts/${filename}/comments`)
      .onSnapshot(snapshot => {
        const posts = snapshot.docs
        .reverse().map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setComments(posts)
      })
    return () => cleanUp()
  }, [filename])


  return (
    <StyledDiv className="comments">
      <CommentForm filename={filename}/>
      {comments.map((comment, i) => { 
        return (
          <div key={i}>
            <p style={{marginBottom:0}}><strong>{comment.name}</strong></p>
            <p>{comment.body}</p>
          </div>
        )
      })}
    </StyledDiv>
  )
}

export default ImageComments;