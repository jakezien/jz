import React from "react"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

let width = props => 100/props.postsPerRow;
let doubleWidth = props => 200/props.postsPerRow;
let space = rhythm(.25);
let doubleSpace = rhythm(1);


const StyledPostWrapper = styled.div`
  flex-basis: calc(${doubleWidth}%);
  min-width: 100%;
  min-width: ${doubleWidth}%;
  margin-bottom: ${doubleSpace};
  @media only screen and (min-width:641px) {
    flex-basis: calc(${width}% - ${space});
    min-width:  calc(${width}% - ${space});
  }
`

const Grid = (props) => {
  const { posts, postCoverImages, postTemplate, postsPerRow } = props;
  const PostTemplate = props.postTemplate

  return (
    <StyledDiv>
      {posts && posts.map( ({node}, index ) => {

        let coverImage
        if (typeof postCoverImages != 'undefined') {
          coverImage = postCoverImages.filter(imgNode => {
            return node.fields.slug.includes(imgNode.relativeDirectory) || node.fields.slug.includes(imgNode.name)
          })
        }

        return(
          <StyledPostWrapper key={index} postsPerRow={postsPerRow}>
            <PostTemplate post={node} coverImage={coverImage ? coverImage : ''} />
          </StyledPostWrapper>
        )
      })}
    </StyledDiv>
  )
}

export default Grid