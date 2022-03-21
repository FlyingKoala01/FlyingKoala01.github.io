import React, { useState } from 'react'

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
            </div>

        </div>

    )
}

