const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createExif } = require(`./createExif`)
const { graphql } = require('graphql');

exports.createPages = async ({ graphql, actions }) => {

  const { createPage, createNodeField } = actions

  // ———— WORK PAGES ———— //
  const workPostTemplate = path.resolve(`./src/templates/work-post.js`)
  const workResult = await graphql(
    `
      {
        allMdx(
          filter: {fileAbsolutePath: {regex: "/content/work/"}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                type
              }
            }
          }
        }
      }
    `
  )

  if (workResult.errors) {
    throw workResult.errors
  }

  // Create work pages
  const workPages = workResult.data.allMdx.edges
  workPages.forEach((post, index) => {
    const previous = index === workPages.length - 1 ? null : workPages[index + 1].node
    const next = index === 0 ? null : workPages[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: workPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })




  // ———— BLOG PAGES ———— //
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const blogResult = await graphql(
    `
      {
        allMdx(
          filter: {fileAbsolutePath: {regex: "/content/blog/"}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (blogResult.errors) {
    throw blogResult.errors
  }

  // Create blog posts pages.
  const posts = blogResult.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })


  // ————————————— JAKESTAGRAM IMAGES ————————————— //
  
  const jakestagramResult = await graphql(`
    {
      allFile(
        filter: {absolutePath: {glob: "**/jakestagram/*"}}
        sort: {fields: fields___exif___iptc___date_time, order: DESC}
      ) {
        nodes {
          fields {
            exif {
              iptc {
                date_time
              }
            }
          }
        }
      }
    }
  `)

  if (jakestagramResult.errors) {
    throw jakestagramResult.errors
  }

  // Add index to nodes.
  const photos = jakestagramResult.data.allFile.nodes

  photos.forEach((node, index) => {
    const photoIndex = photos.length - index
    // console.log(photoIndex, node.fields.exif.iptc.date_time)
    node.fields.photoIndex = photoIndex
    // console.log(node)

    // createNodeField({
    //   name: `slug`,
    //   node,
    //   value: photoIndex
    // })
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField } = actions

  function nthIndex(str, pat, n){
      var L= str.length, i= -1;
      while(n-- && i++<L){
          i= str.indexOf(pat, i);
          if (i < 0) break;
      }
      return i;
  }

  if (node.internal.type === `Mdx`) {
    let value;
    if (node.frontmatter.slug) 
      value = node.frontmatter.slug
    else {
      let path = createFilePath({ node, getNode })
      // Make the url scheme for projects '…/work/<category>-<project>'
      // instead of '…/work/<category>/<project>'
      if (path.match(/\//g || []).length > 3) {
        let index = nthIndex(path, '/', 3)
        path = path.substring(0, index) + '-' + path.substring(index + 1);
      }
      value = path
    }
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.mediaType === 'image/jpeg' && node.absolutePath.includes('jakestagram')) {
    createExif(node, actions, createNodeId)
    
    createNodeField({
      node,
      name: `photoIndex`,
      value: 1
    })
  }
}
