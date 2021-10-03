import React, { useContext, useEffect, useRef } from "react"
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
import JgDopamineHitsCount from './jgDopamineHitsCount'
import DopamineHitForm from "./dopamineHitForm"
import CommentIcon from '../../static/svg/icon-comment.svg'
import JgImageComments from './jgImageComments'
import JgImageDetail from './jgImageDetail'
import JgImageMetadata from './jgImageMetadata'



// ————————————— STYLED COMPONENTS ————————————— //
  
  const ImageFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
  const ImageActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .grid & {
      position: absolute;
      width: 100%;
      bottom: 0;
      justify-content: space-between;
      pointer-events: none;

      button {
        svg {
          height:100%;
          * {
            stroke: white !important;
          }
        }
      }
    }
  ` 


  const JgPost = styled.div`
    position: relative;

    .grid & {
      flex: 1 0 0%;
      margin-right:3px;
      
      .image-wrapper , .gatsby-image-wrapper {
        position: relative;

        img {
          cursor: pointer;
          position:absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        > div:first-child {
          padding-top: 100% !important;
        }
      }

      ${ImageFooter} {
        opacity: 0;
      }

      &:hover {
        .gatsby-image-wrapper {
          opacity: 0.7;
        }
        ${ImageFooter} {
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
    showCommentFormButtonClicked,
    backToGrid,
    displayList 
  } = useContext(JgDisplayContext)

  let { getImgSrc } = useContext(JgDatabaseContext)
  

  let commentButton = useRef()
  let commentIconPortal = useRef()


  const handleVisibilityChange = (isVisible) => {
    console.log(index, isVisible)
    if (isVisible) {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/jakestagram/#' + index)
      }
    }
  }



  return (

      <JgPost id={'post-'+index} data-id={imageNode.name}>

        <div>
          <VisibilitySensor 
            onChange={(isVisible) => {handleImageVisibilityChange(isVisible, index)}} 
            partialVisibility={true}
            minTopValue={500}
            scrollCheck={true}
            scrollThrottle={10}
            resizeCheck={true}
            active={displayStyle === 'list'} 
          > 
            <div className="image-wrapper">
              {displayStyle === 'list' && <JgImageHeader />}
              <div aria-hidden={true}></div>
              <img src=""/>
            </div>
          </VisibilitySensor>
        </div>

        <ImageFooter imageNode={imageNode}>
          <ImageActions>
            <DopamineHitForm imageNode={imageNode}/>
            <div ref={commentIconPortal}></div>
          </ImageActions>
          <JgImageMetadata imageNode={imageNode}/>
        </ImageFooter>

        {displayStyle === 'list' && <JgDopamineHitsCount imageNode={imageNode}/>}
        {displayStyle === 'list' && <JgImageComments imageNode={imageNode} commentIconPortal={commentIconPortal && commentIconPortal.current} />}

      </JgPost>

  )
}

export default JgImage;