import React, {useEffect, useState, useContext} from "react"
import moment from 'moment'
import styled from "styled-components"
import { firestore } from "../../firebase.js"
import { rhythm } from "../utils/typography"
import CommentForm from "./commentForm"
import CommentIcon from '../../static/svg/icon-comment.svg'
import { JgImageContext } from './jgImageContext'



const StyledDiv = styled.div`

  button {
    background: transparent;
    border: 0;
    appearance: none;
    -webkit-appearance: none;
    padding: 0.5rem;
    height: ${rhythm(2)};

    &:hover {
      background: ${props => props.theme.yellowHover};
    }
  }

  .grid & {
    display: none
  }
`

const JgImageComments = (props) => {

  let { imageNode, comments } = useContext(JgImageContext)

  // let filename = imageNode?.name
  // const [comments, setComments] = useState([])
  // const [showForm, setShowForm] = useState(false)

  // let storedData;

  // if (typeof window !== "undefined") {
  //   storedData = localStorage.getItem(filename)
  // }
  // console.log('storedData', storedData)
  
  // useEffect(() => {
  //   const cleanUp = firestore
  //     .collection(`jgPosts/${filename}/comments`)
  //     .onSnapshot(snapshot => {
  //       const posts = snapshot.docs
  //       .reverse().map(doc => {
  //         return { id: doc.id, ...doc.data() }
  //       })
  //       setComments(posts)
  //     })
  //   return () => cleanUp()
  // }, [filename])


  return (
    <StyledDiv className="comments">
{/*      {!showForm && <button onClick={() => setShowForm(!showForm)}>Add a comment</button>}
      {showForm && 
        <div>
          <CommentForm filename={filename}/>
          <button onClick={() => setShowForm(!showForm)}>Cancel</button>
        </div>
      }*/}
      {comments?.map((comment, i) => { 
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

export default JgImageComments;