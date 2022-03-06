import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button';

import './Navbar.css';

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    /*To Fix Sign Up Bug*/ 
    
    useEffect(() => {
        showButton()
    }, []); 

    window.addEventListener('resize', showButton);


    return (
        <>
        <nav className='navbar'>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='.nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        About Me
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Projects
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Work In Progress
                    </Link>
                </li>
            </ul>
            {/*{button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}*/}
        </nav>
    </>
    )
}