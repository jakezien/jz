import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

const Comment = ({comment}) => {

  return (
    <p style={{marginBottom:rhythm(.5)}}>
      <strong>{comment.name}&nbsp;</strong>
      <span>{comment.body}</span>
    </p>
  )
}

export default Comment;