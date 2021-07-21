import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import Layout from "../templates/layout"
import Container from '../components/container'


import { JgDatabaseContextProvider } from '../components/jgDatabaseContext'
import { JgImagesContextProvider } from '../components/jgImagesContext'
import { JgLightboxContextProvider } from '../components/jgLightboxContext'
import { JgDisplayContextProvider } from '../components/jgDisplayContext'
import JgHeader from '../components/jgHeader'
import JgPostsDisplay from '../components/jgPostsDisplay'
import JgLightbox from '../components/jgLightbox'
import SEO from "../components/seo"


// ————————— STYLED COMPONENTS —————————— //

  const StyledContainer = styled(Container)`
    @media screen and (max-width: 767px) {
      padding-left: 0;
      padding-right: 0;
    }
  `

const Jakestagram = ({ data, location }) => {

  const allPosts = data.Jakestagram.nodes

  // TODO prob move tags into a context
  let tags = [...new Set(allPosts.flatMap(node => {
    if (node.fields.exif.iptc.keywords) 
      return node.fields.exif.iptc.keywords
    else return []
  }))]


  return (
    <Layout>
      <SEO title="Jakestagram" />

      <JgImagesContextProvider allPosts={allPosts}>
        <JgDatabaseContextProvider>
          <JgDisplayContextProvider>
            <JgLightboxContextProvider>

              <section>
                <StyledContainer>
                  <JgHeader tags={tags} />
                  <JgPostsDisplay />
                </StyledContainer>
              </section>

            </JgLightboxContextProvider>
          </JgDisplayContextProvider>
        </JgDatabaseContextProvider>
      </JgImagesContextProvider>
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