exports.createPages = ({actions}) => {
  const {createPage} = actions;

  createPage({
    path: '/custom',
    component: require.resolve('./src/templates/CustomPage.tsx'),
    context: {
      title: 'A custom page!',
      meta: {
        description: 'A custom page with context'
      }
    }
  })
}