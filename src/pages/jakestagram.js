import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { chunkArray } from "../utils/functions"
import styled from "styled-components"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import VisibilitySensor from 'react-visibility-sensor'
import Lightbox from 'react-image-lightbox';
import NoScroll from 'no-scroll';

import Layout from "../templates/layout"
import Container from '../components/container'
import JakestagramImage from '../components/jakestagramImage'
import ImageMetadata from '../components/imageMetadata'
import ImageComments from '../components/imageComments'
import ImageDopamineHits from '../components/imageDopamineHits'
import Logo from '../../static/svg/logo-jakestagram.svg'
import GridIcon from '../../static/svg/icon-grid.svg'
import ListIcon from '../../static/svg/icon-list.svg'


// ————————— STYLED COMPONENTS —————————— //

  const StyledContainer = styled(Container)`
    @media screen and (max-width: 767px) {
      padding-left: 0;
      padding-right: 0;
    }
  `

  const Header = styled.div`
    display: flex;
    margin-bottom: ${rhythm(1)};

    div:first-child {
      flex: 1 0 33%
      margin-right:3px;
      @media (min-width: 768px) {
        margin-right: 28px;
      }
    }
    div:last-child {
      flex: 1 0 66%;
      p {
        margin: 0;
      }
    }
  `

  const StyledLogo = styled(Logo)`
    path {
      fill: ${props => props.theme.isDark ? props.theme.textTint : props.theme.textShade};
    }  
  `


  const FeedStyleToggle = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: ${rhythm(1)};
    border-top: 1px solid ${props => props.theme.bg4};
    button {
      flex: 0 0 25%;
      padding: 0;
      cursor: pointer;
      border: 0;
      background: ${props => props.theme.bg0};
      svg {
        pointer-events: none;
        position: relative;
        border: 0;
        padding: ${rhythm(.5)} ${rhythm(.25)};
        width: auto;
        max-width: ${rhythm(1.5)};
        height: ${rhythm(1.5)};
        box-sizing: content-box;
        g * {
          stroke: ${props => props.theme.bg5} !important;
        }
      }
      &.active, &:hover, &:active {
        svg {
          top: -1px;
          border-top: 1px solid ${props => props.theme.yellow};
          g * {
            stroke: ${props => props.theme.yellow} !important;
          }
      }
    }
  `

  const ImageWrapper = styled.div``

  const ImageRow = styled.div`
    ${ImageWrapper}.grid & { 
      display: flex;
      margin-bottom: 3px;
      @media (min-width: 768px) {
        margin-bottom: 28px;
      }
    }
  `

  const StyledGatsbyImage = styled(GatsbyImage)`
    cursor: pointer;
    ${ImageWrapper}.grid & {  
      flex: 1 0 0%;
      margin-right:3px;
      > div:first-child {
        padding-top: 100% !important;
      }
      &:not(:last-of-type) {
        margin-bottom: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
      @media (min-width: 768px) {
        margin-right: 28px;
      }
    }

    ${ImageWrapper}.list & { 
      flex: 1 0 100%;
    }
  `

const Jakestagram = ({ data, location }) => {

  let padding;
  
  if (typeof window !== 'undefined') {
    padding = window.innerWidth > 767 ? 64 : 8
  }

  const loadAmt = 12;
  const allPosts = data.Jakestagram.nodes
  let tags = [...new Set(allPosts.flatMap(node => {
    if (node.fields.exif.iptc.keywords) 
      return node.fields.exif.iptc.keywords
    else return []
  }))]
  
  const [list, setList] = useState([...allPosts.slice(0, loadAmt)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(allPosts.length > loadAmt)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxPadding, setlightboxPadding] = useState(padding)
  const [displayStyle, setDisplayStyle] = useState('grid')

  // ————————————— HANDLERS ————————————— //
    
    const handleVisibilityChange = (isVisible) => {
      if (isVisible) {
        setLoadMore(true)
      }
    }

    const handleImageClick = (e) => {
      NoScroll.on()
      let index = parseInt(e.target.getAttribute('index'))
      console.log(index, allPosts.length - index)
      setLightboxIndex(allPosts.length - index)
      setLightboxOpen(true)
    }

    const handleButtonClick = (e) => {
      let name = e.target.getAttribute('name')
      console.log(e.target)
      setDisplayStyle(name)
    }

    const handleLightboxPrevClick = () => {
      console.log(lightboxIndex)
      let newIndex = (lightboxIndex - 1 + list.length) % list.length
      console.log(lightboxIndex, newIndex, list.length)
      setLightboxIndex(newIndex);
    }

    const handleLightboxNextClick = () => {
      console.log(lightboxIndex)
      if (lightboxIndex === list.length - 2) setLoadMore(true)
      let newIndex = lightboxIndex + 1
      console.log(lightboxIndex, newIndex, list.length)
      setLightboxIndex(newIndex)
    }

    const handleWindowResize = () => {
      let padding = window.innerWidth > 767 ? 64 : 8
      setlightboxPadding(padding);
    }

  useEffect(() => {
    if (loadMore && hasMore) {
      console.log('load more')
      const currentLength = list.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore 
        ? allPosts.slice(currentLength, currentLength + loadAmt)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < allPosts.length
    setHasMore(isMore)
  }, [list])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })


  return (
    <Layout>
      <SEO title="Jakestagram" />
      <section>
        <StyledContainer>
          <Header>
            <div><StyledLogo/></div>
            <div>
              <p>jakezien</p>
              <p><span><strong>{allPosts.length}</strong> posts</span></p>
              <p>{tags.join(' ')}</p>
            </div>
          </Header>
          <FeedStyleToggle>
            <button name="grid" className={displayStyle==='grid' ? 'active':''} onClick={handleButtonClick}>
              <GridIcon/>
            </button>
            <button name="list" className={displayStyle==='list' ? 'active':''} onClick={handleButtonClick}>
              <ListIcon/>
            </button>
          </FeedStyleToggle>
          <ImageWrapper className={displayStyle}>
          {chunkArray(list, 3).map((listChunk, i) => { 
            return (
              <ImageRow key={i}>
                <StyledGatsbyImage image={getImage(listChunk[0])} alt="" index={allPosts.length - (i*3 + 0)} onClick={handleImageClick}/>
                <ImageMetadata image={listChunk[0]} />
                <ImageComments image={listChunk[0]} />
                <ImageDopamineHits image={listChunk[0]} />
                
                <StyledGatsbyImage image={getImage(listChunk[1])} alt="" index={allPosts.length - (i*3 + 1)} onClick={handleImageClick}/>
                <ImageMetadata image={listChunk[1]} />
                <ImageComments image={listChunk[1]} />
                <ImageDopamineHits image={listChunk[1]} />

                <StyledGatsbyImage image={getImage(listChunk[2])} alt="" index={allPosts.length - (i*3 + 2)} onClick={handleImageClick}/>
                <ImageMetadata image={listChunk[2]} />
                <ImageComments image={listChunk[2]} />
                <ImageDopamineHits image={listChunk[2]} />
              </ImageRow>
          )})}
          <VisibilitySensor 
            onChange={handleVisibilityChange} 
            partialVisibility={true}
            offset={{bottom:-300}} 
            scrollCheck={true}
            scrollThrottle={10}
            resizeCheck={true}
          >
            {hasMore ? <p>Loading…</p> : <p>That's all there is</p>}
          </VisibilitySensor>
          </ImageWrapper>

          {lightboxOpen && (
            <Lightbox
              mainSrc={getSrc(list[lightboxIndex])}
              nextSrc={getSrc(list[(lightboxIndex + 1)])}
              prevSrc={getSrc(list[(lightboxIndex - 1)])}
              onCloseRequest={() => {setLightboxOpen(false); NoScroll.off(); }}
              onMovePrevRequest={handleLightboxPrevClick}
              onMoveNextRequest={handleLightboxNextClick}
              clickOutsideToClose={true}
              imagePadding={lightboxPadding}
              wrapperClassName={(lightboxIndex===0 ? 'firstImage ' : '') + (lightboxIndex===allPosts.length-1 ? 'lastImage ' : '')}
            />
          )}
        </StyledContainer>
      </section>
    </Layout>
  )
}

export default Jakestagram

export const pageQuery = graphql`{
Jakestagram :  allFile(
    filter: {absolutePath: {glob: "**/jakestagram/*"}}
    sort: {fields: fields___exif___iptc___date_time, order: DESC}
  ) {
    nodes {
      fields {
        exif {
          exif {
            DateTimeOriginal
          }
          image {
            Make
            Model
          }
          iptc {
            caption
            keywords
            date_time
          }
        }
      }
      name
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
}
`