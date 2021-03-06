import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

import Layout from "../templates/layout"

import Section from '../components/section'

import Hello from "../../content/index/hello"
import Think from "../../content/index/think"
import Do from "../../content/index/do"
import Like from "../../content/index/like"


const ThinkSection = styled(Section)`
  background-color: ${props => props.theme.bg1};
`
const DoSection = styled(Section)`
  background-color: ${props => props.theme.bg2};
`
const FavoriteSection = styled(Section)`
  background-color: ${props => props.theme.bg3};
`

const Home = ({ data, location }) => {

  return (
    <Layout>
      <SEO title="Jake Zien" />

      <Section>
        <Hello />
      </Section>

      <ThinkSection>
        <Think />
      </ThinkSection>

      <DoSection>
        <Do posts={data.work.edges} postCoverImages={data.workCoverImages.nodes} />
      </DoSection>

      <FavoriteSection>
        <Like />
      </FavoriteSection>

    </Layout>
  )
}

export default Home

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  work: allMdx(limit: 8, filter: {fileAbsolutePath: {regex: "\\/content/work/"}}, sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          oneliner
          company
          type
        }
      }
    }
  }
  workCoverImages: allFile(filter: {absolutePath: {regex: "\\/content/work/.*/cover/"}}) {
    nodes {
      relativeDirectory
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, aspectRatio:1.33)
      }
    }
  }
}
`