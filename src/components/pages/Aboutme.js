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
                <div className='glassmorphism'>
                    <p className='textAboutMe'>Born in Milan, Italy in the year 2000. Raised in a bilingual family, spending most of my childhood travelling in between countries, Specifically in Italy, Spain, Russia and Mexico. </p>
                    <p className='textAboutMe'>As a result, I've learnt 4 languages at a proficient level and increased my ability to adapt to change.</p>
                    <p className='textAboutMe'>I am currently studying an <a href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain. And, although I am deeply interested in the whole technology spectrum, I intend to persue a carreer in either web development or cybersecurity.</p>
                    <p className='textAboutMe'></p>
                    <p className='textAboutMe'></p>
                </div>
                <div>
                    <img src={'../../Images/me.png'} className='myFace' alt="" />
                </div>
            </main>
        )
    }
}





