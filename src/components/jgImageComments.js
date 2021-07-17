import React, {useEffect, useState, useContext} from "react"
import moment from 'moment'
import styled from "styled-components"
import { rhythm } from "../utils/typography"
// import CommentForm from "./commentForm"
import CommentIcon from '../../static/svg/icon-comment.svg'
import { JgDatabaseContext } from './jgDatabaseContext'



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

  let { imageNode } = props
  let { getComments } = useContext(JgDatabaseContext)
  let comments = getComments(imageNode?.name)

  //TODO edit and delete local comments


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