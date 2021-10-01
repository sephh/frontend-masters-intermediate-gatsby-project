module.exports = {
  siteMetadata:{
    title: 'Books Club',
    navItems:[
      {
        label: "Books",
        path: "/books"
      },
      {
        label: "Authors",
        path: "/authors"
      },
    ]
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-theme-shared-nav"
  ]
};
