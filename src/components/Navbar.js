import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {

  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    const navs = [
      { name: "home", path: "/" },
      { name: "about", path: "/about" },
      { name: "portfolio", path: "/portfolio" },
      { name: "contact", path: "/contact" }
    ];
    setNavLinks(navs);
  }, []);

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  }
  
  return (
    <>
      <nav className='bannerTop'></nav>
      <nav className='navbar'>
        <ul className={'nav-menu'}>
          {navLinks.map((d, i) => (
            <li key={i} className='nav-item'>
              <Link to={d.path} className='nav-links' style={(usePathname() === `${d.path}`) ? { borderBottom: '4px solid #FFF' } : { borderBottom: '4px solid #000' }}>
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
        </nav>
    </>
  )
}