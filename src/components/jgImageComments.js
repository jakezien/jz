import React, {useEffect, useState, useContext, useRef} from "react"
import moment from 'moment'
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { isElementInViewport, pluralizeLabel } from "../utils/functions"
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

  const [showAll, setShowAll] = useState(false)
  const topRef = useRef(null)

  //TODO edit and delete local comments
 
  const hidePreview = () => {
    setShowAll(true)
  }

  const hideAll = () => {
    setShowAll(false)
    if (!isElementInViewport(topRef?.current)) {
      topRef.current.scrollIntoView()
    }
  }


  return (
    <StyledDiv className="comments" ref={topRef}>
{/*      {!showForm && <button onClick={() => setShowForm(!showForm)}>Add a comment</button>}
      {showForm && 
        <div>
          <CommentForm filename={filename}/>
          <button onClick={() => setShowForm(!showForm)}>Cancel</button>
        </div>
      }*/}
      {!showAll && (
        <div className="preview">
          {comments?.slice(0,2).map((comment, i) => { 
            return (
              <div key={i}>
                <p style={{marginBottom:0}}><strong>{comment.name}</strong></p>
                <p>{comment.body}</p>
              </div>
            )
          })}
          <button onClick={hidePreview}>
            {pluralizeLabel('comment', comments)}
          </button>
        </div>
      )}
    
      {showAll && (
        <div className="all">
          {comments?.map((comment, i) => { 
            return (
              <div key={i}>
                <p style={{marginBottom:0}}><strong>{comment.name}</strong></p>
                <p>{comment.body}</p>
              </div>
            )
          })}
          <button onClick={hideAll}>Hide comments</button>

        </div>
      )}
    </StyledDiv>
  )
}

export default JgImageComments;