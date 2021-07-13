import React, { useContext } from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import { JgContext } from './jgContext'
import { JgImageContextProvider } from "./jgImageContext"

import JgClickInterceptor from './jgClickInterceptor'
import JgImageFooter from './jgImageFooter'
import JgImageComments from './jgImageComments'

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

// TODO: create a context that talks to firestore and 
// holds the imagenode data, and have everyone inside the 
// post subscribe to it. Passing the node all over the place
// is getting terrible.

const JgImage = (props) => {
  
  let {imageNode, index, ...otherProps} = props
  let { handleImageClick } = useContext(JgContext)


  return (
    <JgImageContextProvider imageNode={imageNode} index={index}>
      <JgPost>
        <JgClickInterceptor>
          <GatsbyImage image={getImage(imageNode)} {...otherProps} />
        </JgClickInterceptor>
        <StyledJgImageFooter />
        <JgImageComments />
      </JgPost>
    </JgImageContextProvider>
  )
}

export default JgImage;