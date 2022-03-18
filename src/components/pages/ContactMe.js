import React, { useState } from 'react'
import Particles from "react-tsparticles";

import '../../App.css';
import '../wrapIcon.css';
import europe from '../../Images/europe.png';

export default function ContactMe() {

    let [showHideNotification, setShowHideNotification] = useState(false);

    const animate = () => {
        setShowHideNotification(true);

        setTimeout(() => setShowHideNotification(false), 4500);
    }

    const particlesInit = (main) => {
        console.log(main);
    };
    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <div className='backgroundContactMe'>
            <h1 className="titlePage">Would you like to get in touch?</h1>
            <h2 className='contactMeText'>Follow me on my social media!</h2>
            <h2 className='contactMeEmail'>You can also send me an email to </h2>
            <div className= {showHideNotification ? `popUpNotification` : null}>
                {showHideNotification &&<div className='textPopup'>Email copied to clipboard!</div>}
            </div>
            
            <button className="btn-clipboard" onClick={() =>  
                {navigator.clipboard.writeText('isaac.iglesias.vila19@gmail.com'); 
                animate()}}> isaac.iglesias.vila19@gmail.com 
            </button>

            <div className='europeMap'>
                <img src={europe} className='europe' alt="" />
            </div>

            <div className='contactMe'>
                <div className="wrap">
                    <div className="circle">
                        <div className='ion-twitter'><ion-icon name="logo-twitter"></ion-icon></div>
                        <div className='ion-github'><ion-icon name="logo-github"></ion-icon></div>
                        <div className='ion-linkedin'><ion-icon name="logo-linkedin"></ion-icon></div>
                        <div className='ion-discord'><ion-icon name="logo-discord"></ion-icon></div>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <span className="text">hover on me</span>
                    </div>
                </div>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            opacity: 0
                        },
                        fpsLimit: 120,
                        interactivity: {
                            modes: {
                                push: {
                                    quantity: 2,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                                connect: {
                                    distance: 200,
                                    links: {
                                        opacity: 0.5
                                    },
                                    radius: 180
                                }
                            },
                        },
                        particles: {
                            color: {
                                value: "#D3D3D3",
                            },
                            links: {
                                color: "#D3D3D3",
                                distance: 120,
                                enable: true,
                                opacity: 0.5,
                                width: 0.5,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outMode: "out",
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 600,
                                },
                                value: 20,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: 2,
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>

        </div>

    )
}

