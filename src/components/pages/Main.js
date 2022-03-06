import React from 'react';
import '../../App.css';
import '../Stars.css';
import { Button } from '../Button.js';
import { useNavigate } from 'react-router-dom';

export default function Main() {

    let navigate = useNavigate();

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
            
            <h1 className='myName'>isaac iglesias vila</h1>
            <h2 className='subtitle'>An aspiring ICT engineer <br></br>interested in the many diverse fields concerning technology.</h2>
            <Button onClick={() => {navigate("/AboutMe")}}>Let's get in touch!</Button>
        </main>
    )
}