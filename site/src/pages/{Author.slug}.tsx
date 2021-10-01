import * as React from 'react';
import { graphql, Link } from 'gatsby';
import slugify from 'slugify';

export const query = graphql`
    query AuthorPage($id: String!){
        author(id: {eq: $id}){
            name
            books{
                id
                name
                series
                seriesOrder
            }
        }
    }
`;

function sortAndExtendBooks(books) {
  return books
    .sort((a, b) => a.seriesOrder - b.seriesOrder)
    .map((book) => {
      const series = book.series ? `(${book.series}, book ${book.seriesOrder})` : '';
      const displayName = `${book.name} ${series}`;
      const bookSlug = slugify(book.name, { lower: true });

      let path = '/book/';

      if (book.series) {
        const seriesSlug = slugify(book.series, { lower: true });
        path += `${seriesSlug}/${bookSlug}`;
      } else {
        path += bookSlug;
      }

      return { ...book, path, displayName };
    });
}

function AuthorPage({ data }) {
  const author = data.author;
  const books = sortAndExtendBooks(author.books);

  return (
    <>
      <h1>Books by {author.name}</h1>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={book.path}>{book.displayName}</Link>
          </li>
        ))}
      </ul>

      <Link to="/authors">&larr; back to all authors</Link>
    </>
  );
}

export default AuthorPage;