import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {

    return (
        <>
        <nav className='navbar'>
            <ul className={'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/AboutMe' className='nav-links'>
                        About Me
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Portfolio' className='nav-links'>
                        Portfolio
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/ContactMe' className='nav-links'>
                        Contact Me
                    </Link>
                </li>
            </ul>
        </nav>
    </>
    )
}