import React from "react";

export default ({ data, pathContext }) => {
  const filteredData = data.allUsersJson.edges.filter((url)=>{
    return url.node.fields.slug.replace("/data/users", "") === pathContext.slug;
  })

  console.log(filteredData[0].node.Sheet1);
  return <div>
      <h1>Hello superlist</h1>
      <ul>
          {
            filteredData[0].node.Sheet1.map((item)=>(
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))
          }
      </ul>
    </div>;
};

export const query = graphql`
  query IndexQuery {
     allUsersJson {
        edges {
          node {
            fields {
              slug
            }
            Sheet1 {
              id,
              body,
              title
            }
            Sheet2 {
              id
            }
          } 
        }
      }
  }
`;
