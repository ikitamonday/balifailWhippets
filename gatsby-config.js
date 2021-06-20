const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  siteMetadata: {
    title: 'Balifail Whippet',
    siteUrl: 'https://balifailWhippets.netlify.app'
  },
  flags: {
    DEV_SSR: false
  },
  plugins: [
    'gatsby-transformer-yaml',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "GTM-P4RNF8D",
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
      __key: "images",
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Cabin']
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages',
      },
       __key: "pages",
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              showCaptions: true,
              loading: 'lazy',
              tracedSVG: true
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          `gatsby-remark-responsive-iframe`
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        stylesPath: `${__dirname}/src/cms/admin.css`,
        enableIdentityWidget: true
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
