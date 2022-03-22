import React from 'react'

import '../../App.css';

export default function Aboutme() {
    return (

        <main className='aboutMeBackground'>
            <div className='glassmorphism'>
                <p className='textAboutMe'>{}</p>
                <p className='textAboutMe'>{}</p>
                <p className='textAboutMe'>{}</p>
                <p className='textAboutMe'>{}</p>
            </div>
            <div>
                <img src={'../../Images/me.png'} className='myFace' alt="" />
            </div>
        </main>
    )
}





