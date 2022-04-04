import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

import '../../App.css';
import '../wrapIcon.css';

import europe from '../../Images/europe.png';

export default function ContactMe() {

    let [showHideNotification, setShowHideNotification] = useState(false);

    const animate = () => {
        setShowHideNotification(true);

        setTimeout(() => setShowHideNotification(false), 4000);
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            await new Promise((r) => setTimeout(r, 2500));

            setLoading((loading) => !loading);
        };

        loadData();
    }, [])

    if (loading) {
        return <Loader value={"Let's get in touch with Isaac!"} />
    }
    else {
        return (
            <div className='backgroundContactMe'>
                <h1 className="titlePage">do you have any questions?</h1>
                <h2 className='contactMeText' >At the current time I am commuting between <b>Milan</b> and <b>Barcelona</b>!<br></br>Follow me on my social media! I'm available 24/7!</h2>
                <h2 className='contactMeEmail'>Are you interested in building something together?<br></br>Send me an email to:</h2>
                <div className={showHideNotification ? `popUpNotification` : null}>
                    {showHideNotification && <div className='textPopup'>Email copied to clipboard!</div>}
                </div>

                <button className="btn-clipboard" onClick={() => {
                    navigator.clipboard.writeText('isaac.iglesias.vila19@gmail.com');
                    animate()
                }}> isaac.iglesias.vila19@gmail.com
                </button>

                <img src={europe} className='europe' alt="" />

                <div className="wrap">
                    <div className='wrapText'>Follow me!</div>
                    <a href="https://twitter.com/FlyingKoala01" className='wrapLog'><ion-icon name="logo-twitter"></ion-icon></a>
                    <a href="https://github.com/FlyingKoala01" className='wrapLog'><ion-icon name="logo-github"></ion-icon></a>
                    <a href="https://www.linkedin.com/in/isaac-iglesias-vila-0b6074234/" className='wrapLog'><ion-icon name="logo-linkedin"></ion-icon></a>
                    <a href="https://discordapp.com/users/FlyingKoala#1509/" className='wrapLog'><ion-icon name="logo-discord"></ion-icon></a>
                </div>
            </div>
        )
    }
}
