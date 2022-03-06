import React from 'react';
import './Main.css';
import './Stars.css';

export default function Main() {
    return (
        <main>
            <div className='animate-flicker' id='stars1'></div>
            <div className='animate-flicker' id='stars11'></div>
            <div className='animate-flicker' id='stars111'></div>
            <div className='animate-flicker' id='stars2'></div>
            <div className='animate-flicker' id='stars22'></div>
            <div className='animate-flicker' id='stars222'></div>
            <div className='animate-flicker' id='stars3'></div>
            <div className='animate-flicker' id='stars33'></div>
            <div className='animate-flicker' id='stars333'></div>
            
            <div className='home_star'></div>

            
            <h1 className='myName'>isaac iglesias vila</h1>
            <h2 className='subtitle'>Portoflio Exposition</h2>
            <p className='introductoryParagraph'>An aspiring ICT engineer, interested in the many diverse fields concerning technology.</p>
        </main>
    )
}