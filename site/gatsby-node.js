const fetch = require(`node-fetch`);
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const slugify = require('slugify');

const authors = require('./src/data/authors.json');
const books = require('./src/data/books.json');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode, createTypes } = actions;

  createTypes(`
    type Author implements Node{
      books: [Book!]! @link(from: "slug", by: "author.slug")
    }
    
    type Book implements Node{
      author: Author! @link(from: "author", by: "slug")
    }
  `);

  authors.forEach((author) => {
    createNode({
      ...author,
      id: createNodeId(`author-${author.slug}`),
      parent: null,
      children: [],
      internal: {
        type: 'Author',
        content: JSON.stringify(author),
        contentDigest: createContentDigest(author),
      },
    });
  });

  books.forEach((book) => {
    createNode({
      ...book,
      id: createNodeId(`book-${book.isbn}`),
      parent: null,
      children: [],
      internal: {
        type: 'Book',
        content: JSON.stringify(book),
        contentDigest: createContentDigest(book),
      },
    });
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  createPage({
    path: '/custom',
    component: require.resolve('./src/templates/CustomPage.tsx'),
    context: {
      title: 'A custom page!',
      meta: {
        description: 'A custom page with context',
      },
    },
  });

  const booksResult = await graphql(`
    query GetBooks{
      allBook{
        nodes{
          id
          name
          series
        }
      }
    }
  `);

  const books = booksResult.data.allBook.nodes
    .map((book) => {
      const bookSlug = slugify(book.name, {lower: true});

      let path = '/book/';

      if(book.series){
        const seriesSlug = slugify(book.series, {lower: true})
        path += `${seriesSlug}/${bookSlug}`;
      } else {
        path += `${bookSlug}`;
      }

      return {...book, path};
    });

    books.forEach((book) => {
      createPage({
        path: book.path,
        component: require.resolve('./src/templates/BookPage.tsx'),
        context: {
          id: book.id
        }
      })
    })
};

exports.createResolvers =
  ({
     actions,
     cache,
     createNodeId,
     createResolvers,
     store,
     reporter,
   }) => {
    const { createNode } = actions;
    const resolvers = {
      Book: {
        buyLink: {
          type: 'String',
          resolve: ({ isbn }) => `https://www.powells.com/searchresults?keyword=${isbn}`,
        },
        cover: {
          type: 'File',
          resolve: async ({ isbn, name }) => {
            const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);

            if (!response.ok) {
              reporter.warn(`Error loading details about ${name} - got ${response.status} ${response.statusText}`);
              return null;
            }

            const { covers } = await response.json();

            if (covers.length) {
              const [coverId] = covers;

              return createRemoteFileNode({
                url: `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
                cache,
                createNode,
                createNodeId,
                store,
                reporter,
              });
            }

            return null;
          },
        },
      },
    };

    createResolvers(resolvers);
  };