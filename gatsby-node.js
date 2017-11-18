const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `UsersJson`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allUsersJson {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      console.log(JSON.stringify(result, null, 4));

      result.data.allUsersJson.edges.map(({ node }) => {
        const pathUrl = node.fields.slug.replace("/data/users","");
        createPage({
          path: pathUrl,
          component: path.resolve(`./src/templates/userPage.js`),
          context: {
            slug: pathUrl
          }
        });
      });
      resolve();
    });
  });
};