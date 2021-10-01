import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { link, sharedNav, container } from '../styles/nav.module.css';

export default function Nav(){
  const data = useStaticQuery(graphql`
    query GetSiteMetadata{
        site{
            siteMetadata{
                title,
                navItems{
                    label
                    path
                }
            }
        }
    }
  `);

  const navItems = data?.site?.siteMetadata?.navItems;
  const title = data?.site?.siteMetadata?.title;

  return (
    <header className={container}>
      <Link to="/" className={link}>{title}</Link>

      <nav className={sharedNav}>
        {navItems.map((nav)=> (
          <Link key={nav.path} to={nav.path} className={link}>{nav.label}</Link>
        ))}
      </nav>
    </header>
  );
}