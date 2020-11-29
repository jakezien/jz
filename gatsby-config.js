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
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed-mdx`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-svg`,
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          // families: ['Bau', 'Input', 'Pantograph', 'Pantograph Condensed', 'Montefiore'],
          families: ['Bau', 'Input', 'Pantograph Trial', 'Pantograph Trial Condensed', 'Pantograph Trial Compressed', 'Montefiore'],
          urls: ['fonts/fonts.css']
        },
        prefixPaths: "true"
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
