const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark( limit: 1000 ) {
        edges {
          node {
            id
            fields {
              slug
              contentType
            }
            frontmatter {
              template
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString())) // eslint-disable-line no-console
    throw Error(result.errors);
  }

  const mdFiles = result.data.allMarkdownRemark.edges
  const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')

  _.each(contentTypes, (pages, contentType) => {

    const pagesToCreate = pages.filter(page =>_.get(page, `node.frontmatter.template`))
    if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

    console.log(`Creating ${pagesToCreate.length} ${contentType}`)

    pagesToCreate.forEach((page, index) => {    
      const id = edge.node.id
      const allPages = []
      allPages.push(page.node.fields.slug)
      createPage({
        path: page.node.fields.slug,
        component: path.resolve(`src/templates/${String(page.node.frontmatter.template)}.js`),
        context: {
          id,
          allPages
        }
      })
    })
  })
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  let slug
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    const pathName = parsedFilePath.name

    if (_.get(node, 'frontmatter.slug')) {
      slug = `/${node.frontmatter.slug.toLowerCase()}/`
    } else if ( pathName === 'home' && parsedFilePath.dir === 'pages') {
      slug = `/` 
    } else if(_.get(node, 'frontmatter.title')){
      slug = `/${parsedFilePath.dir}/${_.camelCase(node.frontmatter.title)}`
    }else if (parsedFilePath.dir === '') {
      slug = `/${pathName}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir
    })
  }
}

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false
    });
  }
};

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json']
