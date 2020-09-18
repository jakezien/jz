import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"
import styled from "styled-components"

import Resume from "./resume.mdx"
import AboutText from "./aboutText.mdx"

const About = ({data, location}) => {

  const AboutImg = styled(Img)`
    border-radius: 4px;
    margin-bottom: ${rhythm(2)}; 
    max-height: ${rhythm(18)}; 
    @media screen and (min-width: 641px) {
      max-height: inherit ;
      width: 50%;
      float: right;    
      margin-left: ${rhythm(1)};
    }
  `

  const StyledWrapper = styled.div`
    border-radius: 4px;
    background: #fcfcfc;
    padding: ${rhythm(1)};
  `

  return (
    <Layout location={location}>
      <SEO title="About" />
      <h1>About</h1>
      <AboutImg 
        fluid= {{ ...data.jakey.childImageSharp.fluid, aspectRatio:0.75}}
        objectFit= "contain"
        imgStyle= {{objectFit: "contain"}}
      />
      <AboutText/>
      <StyledWrapper>
        <Resume/>
      </StyledWrapper>
    </Layout>
  )
}

export default About


export const pageQuery = graphql`
  query {
    jakey: file( relativePath: { regex: "/jakey0/i" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;