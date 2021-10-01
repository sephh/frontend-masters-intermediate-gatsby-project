import * as React from 'react';
import { graphql, Link } from 'gatsby';

export const query = graphql`
    query GetAllAuthors{
        allAuthor{
            nodes{
                id
                name
                slug
            }
        }
    }
`;

function AuthorsPage({ data }) {
  const authors = data.allAuthor.nodes;

  return (
    <div>
      <h1>Authors</h1>

      <p>Authors links</p>

      <ul>
        {authors.map((author) =>
          (<li key={author.id}>
            <Link to={`/${author.slug}`}>{author.name}</Link>
          </li>)
        )}
      </ul>
    </div>
  );
}

export default AuthorsPage;