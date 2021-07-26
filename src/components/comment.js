import React, { useContext } from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import { JgDatabaseContext } from './jgDatabaseContext'

const Comment = ({imageNode, comment}) => {

  const { editComment, removeComment } = useContext(JgDatabaseContext)

  const handleEditClick = () => {
    editComment(imageNode, comment.id)
  }

  const handleDeleteClick = () => {
    removeComment(imageNode, comment.id)
  }

  return (
    <p style={{marginBottom:rhythm(.5)}}>
      <strong>{comment.name}&nbsp;</strong>
      <span>{comment.body}</span>
      {comment.isLocal && 
        <span style={{marginLeft:'1em'}}>
          <button 
            className="button button--text" 
            style={{margin: '0 .5em'}}
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button 
            className="button button--text" 
            style={{margin: '0 .5em'}}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </span>
      }
    </p>
  )
}

export default Comment;