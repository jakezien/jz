import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Layout from "../templates/layout"
import { rhythm } from "../utils/typography"
import SEO from "../components/seo"
import Section from '../components/section'

const StyledSection = styled(Section)`
  background-color: ${props => props.theme.bg1};
  padding-bottom: ${rhythm(3)};
  h2 {
    font-weight:400;
  }
  p:not(.bigText), ul {
    font-size: 1.1em;
  }
`


const Basecamp = ({ data, location }) => {
  const imgNodes = data.allFile.nodes
  
  return (
    <Layout location={location}>

      <SEO title="Basecamp"/>

      <Section>
        <h4 style={{letterSpacing:'0.133em'}}>The Basecamp Challenge</h4>
        <h1 style={{fontWeight:500, opacity:0.9}}>Set Aside: My Pitch</h1>
      </Section>
    
      <StyledSection>
        <MDXRenderer images={imgNodes}>{data.mdx.body}</MDXRenderer>
      </StyledSection>

    </Layout>
  )
}

export default Basecamp

export const pageQuery = graphql`query {
  site {
    siteMetadata {
      title
    }
  }
  mdx(fields: {slug: {eq: "/basecamp/"}}) {
    id
    slug
    body
  }
  allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, absolutePath: {regex: "\\/content/basecamp/"}}) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, backgroundColor:"transparent", transformOptions:{fit:CONTAIN})
      }
    }
  }
}  
`