import React, { useState } from 'react'
import Particles from "react-tsparticles";

import '../../App.css';
import '../wrapIcon.css';
import europe from '../../Images/europe.png';

export default function ContactMe(props) {

    let content = {
        en: {
            titlePage: "do you have any questions?",
            contactMeText: "Follow me on my social media! I'm available 24/7",
            contactMeEmail: "You can also send me an email to ",
            textPopup: "Email copied to clipboard!"
        },
        it:{
            titlePage: "hai qualche domanda?",
            contactMeText: "Seguimi sui social! Disponibilità 24/7",
            contactMeEmail: "Se vuoi mandami una mail a ",
            textPopup: "Email copiata negli appunti "
        },
        es:{
            titlePage: "¿tienes alguna pregunta?",
            contactMeText: "¡Sígueme en mis redes sociales! Estoy disponible 24/7",
            contactMeEmail: "Puedes enviarme un correo a ",
            textPopup: "Correo copiado en el portapapeles "
        }
    };
console.log(props.value);
    switch (props.value) {
        case 'it':
            content = content.it;
            break;
        case 'es':
            content = content.es;
            break;
        case 'en':
            content = content.en;
            break;
        default:
            content = content.en;
            break;
    };

    let [showHideNotification, setShowHideNotification] = useState(false);

    const animate = () => {
        setShowHideNotification(true);

        setTimeout(() => setShowHideNotification(false), 4000);
    }

    const particlesInit = (main) => {
        console.log(main);
    };
    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <div className='backgroundContactMe'>
            <h1 className="titlePage">{content.titlePage}</h1>
            <h2 className='contactMeText'>{content.contactMeText}</h2>
            <h2 className='contactMeEmail'>{content.contactMeEmail}</h2>
            <div className= {showHideNotification ? `popUpNotification` : null}>
                {showHideNotification &&<div className='textPopup'>{content.textPopup}</div>}
            </div>
            
            <button className="btn-clipboard" onClick={() =>  
                {navigator.clipboard.writeText('isaac.iglesias.vila19@gmail.com'); 
                animate()}}> isaac.iglesias.vila19@gmail.com <ion-icon name="clipboard-outline" size="small"></ion-icon>
            </button>

            <div className='europeMap'>
                <img src={europe} className='europe' alt="" />
            </div>

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

