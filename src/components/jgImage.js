import React, { useContext, useRef } from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import { JgLightboxContext } from './jgLightboxContext'

// import JgClickInterceptor from './jgClickInterceptor'
import JgImageFooter from './jgImageFooter'
import JgImageComments from './jgImageComments'
import JgImageDetail from './jgImageDetail'

// ————————————— STYLED COMPONENTS ————————————— //
  
  const StyledJgImageFooter = styled(JgImageFooter)``

  const JgPost = styled.div`
    position: relative;

    .grid & {
      flex: 1 0 0%;
      margin-right:3px;
      
      .gatsby-image-wrapper {
        cursor: pointer;
        > div:first-child {
          padding-top: 100% !important;
        }
      }

      ${StyledJgImageFooter} {
        opacity: 0;
      }

      &:hover {
        .gatsby-image-wrapper {
          opacity: 0.7;
        }
        ${StyledJgImageFooter} {
          opacity: 1;
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
  
  let { imageNode, index, ...otherProps } = props
  let { handleImageClick } = useContext(JgLightboxContext)

  return (

      <JgPost>
        <div onClick={() => handleImageClick(index)}>
          <GatsbyImage image={getImage(imageNode)} {...otherProps} />
        </div>
        <StyledJgImageFooter imageNode={imageNode}/>
        <JgImageComments imageNode={imageNode}/>
      </JgPost>

  )
}

export default JgImage;