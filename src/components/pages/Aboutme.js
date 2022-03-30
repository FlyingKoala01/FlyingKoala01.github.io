import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

import '../../App.css';

export default function Aboutme() {

    const initialVisibleLogo = {
        pyLogo: false,
        goLogo: false,
        cLogo: false,
        assemblyLogo: false,
        jsLogo: false,
        htmlLogo: false,
        cssLogo: false,
        reactLogo: false
    };

    const [visibleLogo, setVisibleLogo] = useState(initialVisibleLogo);

    //show logo by given key
    const showLogo = (event, key) => {
        event.preventDefault();
        setVisibleLogo({ ...visibleLogo, ...{ [key]: true } });
    };

    //hide logo by given key
    const hideLogo = (event, key) => {
        event.preventDefault();
        setVisibleLogo({ ...visibleLogo, ...{ [key]: false } });
    };


    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            await new Promise((r) => setTimeout(r, 3000));

            setLoading((loading) => !loading);
        };

        loadData();
    }, [])

    if (loading) {
        return <Loader value={"Who is Isaac?"} />
    }

    else {
        return (
            <main className='aboutMeBackground'>
                <h1 className='titlePage' >what should you know about me</h1>
                <div className='personDiv'>
                    <h2 className='subtitlePage'>as a person</h2>
                    <p className='textAboutMe'>Raised in a <b>bilingual</b> family, spending most of my childhood travelling in between countries, Specifically in Italy, Spain, Russia and Mexico. As a result, I've learnt <b>4</b> languages at a <b>proficient</b> level (English, Italian, Spanish and Catalan).</p>
                    <p className='textAboutMe'> Nevertheless, not only I learnt languages by my expatriate experience. I sincerely believe it has taught me the ability to <b>adapt</b> to change and to work in any given workspace and culture.</p>
                    <p className='textAboutMe'>Other stuff about me??</p>
                    <p className='textAboutMe'></p>
                </div>
                <div className='engineerDiv'>
                    <h2 className='subtitlePage'>as an engineer</h2>
                    <p className='textAboutMe'>I am currently studying an <a classname="degref" href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain. And, although I am deeply interested in the whole technology spectrum, I intend to persue a carreer in either <b>web development</b> or <b>cybersecurity</b>.</p>
                    <p className='textAboutMe'>Throughout these years, I had been studying the following programming languages:</p>
                    <div class="wrapper">
                        <div class="one">
                            <p>Python</p>
                            <img className="imgLogo" src='../../Images/ProgLang/python.png' alt='' />
                        </div>
                        <div class="two">Go</div>
                        <div class="three">C</div>
                        <div class="four">Assembly</div>
                        <div class="five">Javascript</div>
                        <div class="six">HTML</div>
                        <div class="seven">CSS</div>
                        <div class="eight">React JS</div>
                    </div>
                    <p className='textAboutMe'>Additionally, I had been introduced to several technologies, software and other tools:</p>
                    <div class="wrapper">
                        <div class="one">Matlab/Octave</div>
                        <div class="two">NI Multisim</div>
                        <div class="three">Intel Quartus (ModelSim)</div>
                        <div class="four">LaTeX</div>
                        <div class="five">Arduino</div>
                        <div class="six">Git/SVN</div>
                        <div class="seven">Kali Linux</div>
                        <div class="eight">Ubuntu</div>
                    </div>
                </div>
                <div>
                    <img src={'../../Images/me.png'} className='myFace' alt="" />
                </div>
            </main>
        )
    }
}





