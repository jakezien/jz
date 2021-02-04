require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Jake Zien`,
    author: {
      name: `Jake Zien`,
      summary: `Product designer with visual design and front end chops.`,
    },
    description: `Personal and portfolio site.`,
    siteUrl: `https://jakezien.com/`,
    social: {
      twitter: `hova414`,
      instagram: `hova414`,
    },
  },
  pathPrefix: "/jz",
  plugins: [

    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
      path: `${__dirname}/content/`,
        name: `content`,
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,

          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },

          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },

        ],
      },
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jake Zien`,
        short_name: `JZ`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `rgb(255, 194, 41)`,
        display: `minimal-ui`,
        icon: `content/assets/monogram.svg`,
      },
    },

    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        mode: "async",
        custom: [{
          name: "Pantograph",
          file: "/fonts/fonts.css",
        }],
        web: [{
          name: "covik-sans",
          file: "https://use.typekit.net/ath0ajt.css"
        }]
      }
    },

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

 
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
