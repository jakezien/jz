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
import JgImage from '../components/jgImage'
import JgPostsDisplay from '../components/jgPostsDisplay'
import Logo from '../../static/svg/logo-jakestagram.svg'


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

  const ImageRow = styled.div`
    .grid & { 
      display: flex;
      margin-bottom: 3px;
      @media (min-width: 768px) {
        margin-bottom: 28px;
      }
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
            <div>
              <StyledLogo/>
            </div>
            <div>
              <p>jakezien</p>
              <p><span><strong>{allPosts.length}</strong> posts</span></p>
              <p>{tags.join(' ')}</p>
            </div>
          </Header>

          <JgPostsDisplay>
            {chunkArray(list, 3).map((listChunk, i) => { 
              return (
                <ImageRow key={i}>
                  <JgImage imageNode={listChunk[0]} alt="" index={allPosts.length - (i*3 + 0)} onClick={handleImageClick}/>
                  <JgImage imageNode={listChunk[1]} alt="" index={allPosts.length - (i*3 + 1)} onClick={handleImageClick}/>
                  <JgImage imageNode={listChunk[2]} alt="" index={allPosts.length - (i*3 + 2)} onClick={handleImageClick}/>
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
          </JgPostsDisplay>

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