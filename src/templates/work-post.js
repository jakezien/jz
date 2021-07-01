import React, {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx"
import Lightbox from 'react-image-lightbox';
import NoScroll from 'no-scroll';

import Layout from "./layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { imageByName, testFunc } from "../utils/functions";


import Container from "../components/container"
import WidthBleeder from "../components/widthBleeder"
import PostFooterNav from "../components/postFooterNav"


const WorkPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const imgNodes = data.allFile.nodes
  const coverImage = getImage(imgNodes.filter(node => node.name.includes("cover"))[0])

  let padding;

  if (typeof window !== 'undefined') {
    padding = window.innerWidth > 767 ? 64 : 8
  }

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxPadding, setlightboxPadding] = useState(padding)

  const handleImageClick = (e) => {
    NoScroll.on()
    let index = parseInt(e.target.getAttribute('index'))
    console.log(index, imgNodes[index])
    console.log(index, imgNodes.length - index)
    setLightboxIndex(imgNodes.length - index)
    setLightboxOpen(true)
  }

  const handleLightboxPrevClick = () => {
    console.log(lightboxIndex)
    let newIndex = (lightboxIndex - 1 + imgNodes.length) % imgNodes.length
    console.log(lightboxIndex, newIndex, imgNodes.length)
    setLightboxIndex(newIndex);
  }

  const handleLightboxNextClick = () => {
    console.log(lightboxIndex)
    let newIndex = lightboxIndex + 1
    console.log(lightboxIndex, newIndex, imgNodes.length)
    setLightboxIndex(newIndex)
  }

  const handleWindowResize = () => {
    let padding = window.innerWidth > 767 ? 64 : 8
    setlightboxPadding(padding);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleWindowResize)


    //TODO : gatsbyimages don't load until they're in view, so how do we solve this?
    document.querySelectorAll('figure .gatsby-image-wrapper').forEach((e, i) => {
      console.log(i, e)
      e.setAttribute('index', i)
      e.onclick = handleImageClick
      e.style.cursor = 'pointer'
    })
    // document.querySelectorAll('figure img').forEach((e) => {
    //   e.onclick = handleImageClick
    //   e.style.cursor = 'pointer'
    // })
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />

      <Container>
        <article>

          <WidthBleeder>
            <GatsbyImage 
              image={coverImage} 
              alt={post.frontmatter.title} 
              style={{maxHeight: '60vh'}}
            />
          </WidthBleeder>

          <header>
            <h1>{post.frontmatter.title}</h1>
            {/*<p>{post.frontmatter.date}</p>*/}
          </header>

          <MDXRenderer images={imgNodes}>{post.body}</MDXRenderer>
        </article>

      </Container>
      <PostFooterNav pageContext={pageContext} />

      {lightboxOpen && (
        <Lightbox
          mainSrc={getSrc(imgNodes[lightboxIndex])}
          nextSrc={getSrc(imgNodes[(lightboxIndex + 1)])}
          prevSrc={getSrc(imgNodes[(lightboxIndex - 1)])}
          onCloseRequest={() => {setLightboxOpen(false); NoScroll.off(); }}
          onMovePrevRequest={handleLightboxPrevClick}
          onMoveNextRequest={handleLightboxNextClick}
          clickOutsideToClose={true}
          imagePadding={lightboxPadding}
          wrapperClassName={(lightboxIndex===0 ? 'firstImage ' : '') + (lightboxIndex===imgNodes.length-1 ? 'lastImage ' : '')}
        />
      )}

    </Layout>
  );
}
export default WorkPostTemplate

export const pageQuery = graphql`query WorkPostBySlug($slug: String!) {
  site {
    siteMetadata {
      title
    }
  }
  mdx(fields: {slug: {eq: $slug}}) {
    slug
    id
    excerpt(pruneLength: 160)
    body
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
  allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {regex: $slug}}) {
    nodes {
      name
      id
      extension
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, formats:[WEBP, AUTO])
        original {
          src
          height
          width
        }
      }
    }
  }
}
`
