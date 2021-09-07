import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../templates/layout"
import { rhythm } from "../utils/typography"

import SEO from "../components/seo"
import Section from '../components/section'
import Grid from "../components/grid"
import FavoritePostCard from "../../src/templates/favoritePostCard"


const StyledSection = styled(Section)`
  background-color: ${props => props.theme.bg2};
`

const Favorites = ({ data, location }) => {

  return (
    <Layout location={location}>

      <SEO title="Favorites" />

      <Section>
        <h1>Things That I Like</h1>
        <p className="bigText">Things I like enough to recommend generally, publicly, indefinitely.</p>
      </Section>
    
      <StyledSection>
        <Grid posts={data.favorites.edges} 
              postCoverImages={data.coverImages.nodes}
              postTemplate={FavoritePostCard} 
              postsPerRow="3"
        />
      </StyledSection>

    </Layout>
  )
}

export default Favorites


export const pageQuery = graphql`{
    site {
      siteMetadata {
        title
      }
    }

    favorites: allMdx(filter: {fileAbsolutePath: {regex: "\\/content/favorites/"}}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          body
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            subtitle
            type
            imageMargin
            link
            linkText
          }
        }
      }
    }

    coverImages: allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, absolutePath: {regex: "\\/content/favorites/"}}) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, aspectRatio:1, backgroundColor:"transparent", transformOptions:{fit:CONTAIN})
        }
      }
    }
  }
`