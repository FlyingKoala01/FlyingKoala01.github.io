import React, {useState, useEffect} from 'react'
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
        return <Loader />}
    
        else {
    return (
        <main className='aboutMeBackground'>
            <div className='glassmorphism'>
                <p className='textAboutMe'>Hi, I'm Isaac. I was born in Milan, Italy in the year 2000. Raised in a bilingual family and spent most of my childhood travelling in between countries.</p>
                <p className='textAboutMe'>Specifically in Italy, Spain, Russia and Mexico. This has lead me in learning 4 languages at a proficient level, increased my ability to adapt to change.</p>
                <p className='textAboutMe'>I am currently studying an <a href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain.</p>
                <p className='textAboutMe'>However, although I am deeply interested in many fields around technology, I am mostly interested in computer science and software.</p>
                <p className='textAboutMe'>Currently, I intend to persue a carreer in either web development or cybersecurity.</p>
            </div>
            <div>
                <img src={'../../Images/me.png'} className='myFace' alt="" />
            </div>
        </main>
        )
    }
}





