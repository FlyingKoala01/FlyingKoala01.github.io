import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

import '../../App.css';

import europe from '../../Images/europe.png';

export default function ContactMe() {

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
                <img src={europe} className='europe' alt="" />

                <h2 className='contactMeText' >At the current time I am commuting between <b>Milan</b> and <b>Barcelona</b>!<br/>If you are interested in building something together <b>contact me</b>!</h2>

                <div class="wrapSocial">
                        <div class="one">
                            <a href="https://github.com/FlyingKoala01" className='wrapLog'><ion-icon name="logo-github"></ion-icon></a>
                        </div>
                        <div class="two" >
                            <a href="https://www.linkedin.com/in/isaac-iglesias-vila-0b6074234/" className='wrapLog'><ion-icon name="logo-linkedin"></ion-icon></a>
                        </div>
                        <div class="three">
                            <a href="https://discordapp.com/users/FlyingKoala#1509/" className='wrapLog'><ion-icon name="logo-discord"></ion-icon></a>
                        </div>
                        <div class='four'>
                            <a href="isaac.iglesias.vila19@gmail.com" className='wrapLog'><ion-icon name="at-outline"></ion-icon></a>
                        </div>
                        <div class="five" >
                            <div className='contactInfo'> FlyingKoala01 </div>
                        </div>
                        <div class="six">
                            <div className='contactInfo'> Isaac Iglesias Vila </div>
                        </div>
                        <div class="seven">
                            <div className='contactInfo'> FlyingKoala#1509 </div>
                        </div>
                        <div className='eight'>
                            <div className='contactInfo'> isaac.iglesias.vila19@gmail.com </div>
                        </div>
                    </div>
            </div>
        )
    }
} 
