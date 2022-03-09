import React from 'react';
import '../../App.css';
import '../Stars.css';

export default function Main() {


    return (
        <main className='main'>
            <div className='skyBackground'>
                <div className='animate-flicker' id='stars1'></div>
                <div className='animate-flicker' id='stars11'></div>
                <div className='animate-flicker' id='stars111'></div>
                <div className='animate-flicker' id='stars2'></div>
                <div className='animate-flicker' id='stars22'></div>
                <div className='animate-flicker' id='stars222'></div>
                <div className='animate-flicker' id='stars3'></div>
                <div className='animate-flicker' id='stars33'></div>
                <div className='animate-flicker' id='stars333'></div>
            </div>

            <div className="TextHome">
                <h1 className='myName'>isaac iglesias vila</h1>
                <h2 className='subtitle'>An aspiring ICT engineer interested in the<br></br> many diverse fields concerning technology.</h2>
            </div>
            
        </main>
    )
}