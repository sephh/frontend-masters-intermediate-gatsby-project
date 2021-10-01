module.exports = {
  siteMetadata:{
    title: 'Gatsby Shared Nav Theme',
    navItems:[
      {
        label: "Home",
        path: "/"
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-layout',
      options:{
        component: require.resolve(`${__dirname}/src/components/Layout.tsx`)
      }
    }
  ]
};