import React, { useContext, useRef } from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { navigate } from '@reach/router'
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import { JgLightboxContext } from './jgLightboxContext'
import { JgDisplayContext } from './jgDisplayContext'
import { JgDatabaseContext } from './jgDatabaseContext'
import VisibilitySensor from 'react-visibility-sensor'


// import JgClickInterceptor from './jgClickInterceptor'
import JgImageHeader from './jgImageHeader'
import JgImageFooter from './jgImageFooter'
import JgDopamineHitsCount from './jgDopamineHitsCount'
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
        margin-right: 8px;
      }
    }
    
    .list & {
      flex: 1 0 100%;
      padding-top:${rhythm(1)};
    }
  `

const JgImage = (props) => {
  
  let { imageNode, index, ...otherProps } = props
  // let { handleImageClick } = useContext(JgLightboxContext)
  let { 
    displayStyle,
    handleImageClick,
    handleImageVisibilityChange,
    backToGrid,
    showPosts 
  } = useContext(JgDisplayContext)


  const handleVisibilityChange = (isVisible) => {
    console.log(index, isVisible)
    if (isVisible) {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/jakestagram/#' + index)
      }
    }
  }

  return (

      <JgPost id={'post-'+index}>
        <div onClick={() => handleImageClick(index)}>
          <VisibilitySensor 
            onChange={(isVisible) => {handleImageVisibilityChange(isVisible, index)}} 
            partialVisibility={true}
            minTopValue={500}
            scrollCheck={true}
            scrollThrottle={10}
            resizeCheck={true}
            active={displayStyle === 'list'}
          > 
            <div>
              {displayStyle === 'list' && <JgImageHeader />}
              <GatsbyImage image={getImage(imageNode)} {...otherProps} />
            </div>
          </VisibilitySensor>
        </div>
        <StyledJgImageFooter imageNode={imageNode}/>
        {displayStyle === 'list' && <JgDopamineHitsCount imageNode={imageNode}/>}
        {displayStyle === 'list' && <JgImageComments imageNode={imageNode}/>}
      </JgPost>

  )
}

export default JgImage;