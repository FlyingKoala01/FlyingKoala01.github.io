import React from 'react'

import '../../App.css';

export default function Aboutme(props) {
    let content = {
        en: {
            textMe: "Who am I, who am I, who am I. I dont know, I dont know.",
            textTravel: "During my twenty years I had moved back and forth between Italy and Spain. During my late teenage years I moved to Russia and Mexico to later come back and continue my studies in Europe.",
            textUni: "I began my University career persueing a career in mathematics to later discover it was not my right path. I therefore began my studies in ICT, opening myself to the seemingly infinite world of technology.",
            textFut: "Once I obtain my engineering degree I would like to persue a Master in Computer Science to later specialize in cybersecurity. However, I intend to expand further my studies in Web Development."
        },
        it:{
            textMe: "",
            textTravel: "",
            textUni: "",
            textFut: ""
        },
        es:{
            textMe: "",
            textTravel: "",
            textUni: "",
            textFut: ""
        }
    };

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
    
    return (

        <main className='aboutMeBackground'>

            <div className='glassmorphism'>
                <p className='textAboutMe'>{content.textMe}</p>
                <p className='textAboutMe'>{content.textTravel}</p>
                <p className='textAboutMe'>{content.textUni}</p>
                <p className='textAboutMe'>{content.textFut}</p>
            </div>
            <div>
                <img src={'../../Images/me.png'} className='myFace' alt="" />
            </div>
        </main>
    )
}





