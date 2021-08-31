import React, {useEffect, useState, useContext, useRef} from "react"
import moment from 'moment'
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { isElementInViewport, numberLabel } from "../utils/functions"
// import CommentForm from "./commentForm"
import CommentIcon from '../../static/svg/icon-comment.svg'
import { JgDatabaseContext } from './jgDatabaseContext'
import Comment from './comment'
import CommentForm from './commentForm'
import {createPortal} from 'react-dom'


const StyledDiv = styled.div`
  
  margin-top: ${rhythm(.5)};

  .button--text {
    margin-bottom: ${rhythm(.5)};
    opacity: 0.66;

    &:hover {
      opacity: 1;
    }
  }

`

const JgCommentsButton = () => {
  return (
    <button className="button button--icon">
      <CommentIcon/>
    </button>
  )
}

const JgImageComments = (props) => {

  let { imageNode, commentIconPortal } = props
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
      {!showAll && (
        <div className="preview">
          {comments?.length > 0 && (
            <Comment imageNode={imageNode} comment={comments[0]} />
          )}
          {comments?.length === 2 && (
            <Comment imageNode={imageNode} comment={comments[1]} />
          )}
          {comments?.length > 2 && (
            <>
              <button className="button button--text" onClick={hidePreview}>
                {'View all ' + numberLabel('comment', comments)}
              </button>
              <Comment imageNode={imageNode} comment={comments[1]} />
            </>
          )}
        </div>
      )}
    
      {showAll && (
        <div className="all">
          {comments?.map((comment, i, comments) => 
            <Comment imageNode={imageNode} key={comments.length-1-i} comment={comments[comments.length-1-i]} />
          )}
          <CommentForm imageNode={imageNode}/>
          <button className="button button--text" onClick={hideAll}>Hide comments</button>
        </div>
      )}

      {createPortal(
        <button className="button button--icon" onClick={hidePreview}>
          <CommentIcon/>
        </button>,
        commentIconPortal
      )}    

    </StyledDiv>
  )
}

export default JgImageComments;