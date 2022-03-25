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

            await new Promise((r) => setTimeout(r, 3000));

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
                <h2 className='contactMeText' style={{ top: "170px" }}>Nowadays you can find me flying between Milan and Barcelona!</h2>
                <h2 className='contactMeText'>Follow me on my social media! I'm available 24/7</h2>
                <h2 className='contactMeEmail'>You can also send me an email to</h2>
                <div className={showHideNotification ? `popUpNotification` : null}>
                    {showHideNotification && <div className='textPopup'>Email copied to clipboard!</div>}
                </div>

                <button className="btn-clipboard" onClick={() => {
                    navigator.clipboard.writeText('isaac.iglesias.vila19@gmail.com');
                    animate()
                }}> isaac.iglesias.vila19@gmail.com <ion-icon name="clipboard-outline" size="small"></ion-icon>
                </button>

                <img src={europe} className='europe' alt="" />

                <div className='contactMe'>
                    <div className="wrap">
                        <div className="circle">
                            <div className='ion-twitter'><a href="https://twitter.com/FlyingKoala01"><ion-icon name="logo-twitter"></ion-icon></a></div>
                            <div className='ion-github'><a href="https://github.com/FlyingKoala01"><ion-icon name="logo-github"></ion-icon></a></div>
                            <div className='ion-linkedin'><a href="https://www.linkedin.com/in/isaac-iglesias-vila-0b6074234/"><ion-icon name="logo-linkedin"></ion-icon></a></div>
                            <div className='ion-discord'><a href="https://discordapp.com/users/FlyingKoala#1509/"><ion-icon name="logo-discord"></ion-icon></a></div>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <span className="socialIcon"><ion-icon name="share-social-outline" font-size="200px"></ion-icon></span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
