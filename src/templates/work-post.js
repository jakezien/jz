import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import Container from "../components/container"
import WidthBleeder from "../components/widthBleeder"
import PostFooterNav from "../components/postFooterNav"


const WorkPostTemplate = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const imgNodes = data.allFile.nodes
  const coverImage = imgNodes.filter(node => 
    {return node.name.includes("cover")})[0].childImageSharp


  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Container>
        <article>

          <WidthBleeder>
            <GatsbyImage image={coverImage.gatsbyImageData} alt={post.frontmatter.title}/>
          </WidthBleeder>

          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>

          <MDXRenderer images={imgNodes}>{post.body}</MDXRenderer>
        </article>

        <PostFooterNav pageContext={pageContext} />
      </Container>


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
      description
    }
  }
  allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, relativeDirectory: {regex: $slug}}) {
    nodes {
      name
      id
      extension
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
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
