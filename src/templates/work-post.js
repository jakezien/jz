import React, {useState, useEffect, useRef} from "react"
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
import FigureLightbox from "../components/FigureLightbox"

const WorkPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const imgNodes = data.allFile.nodes
  const coverImage = getImage(imgNodes.filter(node => node.name.includes("cover"))[0])


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

      <FigureLightbox />

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
