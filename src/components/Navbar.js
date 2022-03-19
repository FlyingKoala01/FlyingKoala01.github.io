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
                        home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/AboutMe' className='nav-links'>
                        about
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Portfolio' className='nav-links'>
                        portfolio
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/ContactMe' className='nav-links'>
                        contact
                    </Link>
                </li>
            </ul>
        </nav>
    </>
    )
}