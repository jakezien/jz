import React from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"

import ImageMetadata from './imageMetadata'
import ImageComments from './imageComments'
import ImageDopamineHits from './imageDopamineHits'

const JgPost = styled.div`
  .grid & {
    flex: 1 0 0%;
    margin-right:3px;
    
    .gatsby-image-wrapper {
      cursor: pointer;
      > div:first-child {
        padding-top: 100% !important;
      }
      &:hover {
        opacity: 0.7
      }
    }

    &:not(:last-of-type) {
      margin-bottom: 0;
    }

    &:last-child {
      margin-right: 0;
    }
    
    @media (min-width: 768px) {
      margin-right: 28px;
    }
  }
  
  .list & {
    flex: 1 0 100%;
    margin-bottom:${rhythm(1)};
  }
`

const JgImage = (props) => {
  
  let {imageNode, ...otherProps} = props

  return (
    <JgPost>
      <GatsbyImage image={getImage(imageNode)} {...otherProps} />
      <ImageMetadata image={imageNode} />
      <ImageDopamineHits image={imageNode} />
      <ImageComments image={imageNode} />
    </JgPost>
  )
}

export default JgImage;