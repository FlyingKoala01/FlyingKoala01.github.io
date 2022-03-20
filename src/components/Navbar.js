import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {

    const [section, selectedSection] = useState('home');
    
    const changeSection = clicked => {
        selectedSection(`${clicked}`);
        console.log(section);
      };
    
    return (
        <>
        <nav className='navbar'>
            <ul className={'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' this_section = "home" onClick={e => changeSection(e.target.this_section)} style={ ( section === 'home' ) ? {borderBottom: '4px solid #FFF' } : {borderBottom: '4px solid #000' } } className='nav-links'>
                        home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/AboutMe' this_section = "aboutMe" onClick={e => changeSection(e.target.this_section)} style={ ( section === 'aboutMe' ) ? {borderBottom: '4px solid #FFF' } : {borderBottom: '4px solid #000' } } className='nav-links'>
                        about
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Portfolio' this_section = "portfolio" onClick={e => changeSection(e.target.this_section)} style={ ( section === 'portfolio' ) ? {borderBottom: '4px solid #FFF' } : {borderBottom: '4px solid #000' } } className='nav-links'>
                        portfolio
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/ContactMe' this_section = "contactMe" onClick={e => changeSection(e.target.this_section)} style={ ( section === 'contactMe' ) ? {borderBottom: '4px solid #FFF' } : {borderBottom: '4px solid #000' } } className='nav-links'>
                        contact
                    </Link>
                </li>
            </ul>
        </nav>
    </>
    )
}