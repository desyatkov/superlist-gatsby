import React from 'react'
import Link from 'gatsby-link'

export default ({ children, data }) => {
  return (
    <div>
      <h1>Hi SuperList</h1>
      <p>Welcome to your new SuperList.</p>
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  );
};

