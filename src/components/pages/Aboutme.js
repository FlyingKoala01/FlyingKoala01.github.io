import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

import '../../App.css';

export default function Aboutme() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            await new Promise((r) => setTimeout(r, 3500));

            setLoading((loading) => !loading);
        };

        loadData();
    }, [])

    if (loading) {
        return <Loader />
    }

    else {
        return (
            <main className='aboutMeBackground'>
                <h1 className='titlePage' style={{fontSize: "55px", left:"5%", letterSpacing: "0.199cm" }}>what should you know about me</h1>
                <div className='personDiv'>
                    <h2 className='subtitlePage'>as a person</h2>
                    <p className='textAboutMe'>Raised in a <b>bilingual</b> family, spending most of my childhood travelling in between countries, Specifically in Italy, Spain, Russia and Mexico. As a result, I've learnt <b>4</b> languages at a <b>proficient</b> level and increased my ability to <b>adapt</b> to change.</p>
                    <p className='textAboutMe'>I consider myself a very dynamic person, able to tackle the fuyck donfBFUIA</p>
                    <p className='textAboutMe'></p>
                    <p className='textAboutMe'></p>
                    <p className='textAboutMe'></p>
                </div>
                <div className='engineerDiv'>
                    <h2 className='subtitlePage'>as an engineer</h2>
                    <p className='textAboutMe'>I am currently studying an <a classname="degref" href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain. And, although I am deeply interested in the whole technology spectrum, I intend to persue a carreer in either <b>web development</b> or <b>cybersecurity</b>.</p>
                    <p className='textAboutMe'>Throughout these years, I had been introduced to the following programming languages:</p>
                </div>
                <div>
                    <img src={'../../Images/me.png'} className='myFace' alt="" />
                </div>
            </main>
        )
    }
}





