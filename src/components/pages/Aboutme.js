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
        reactLogo: false,
        matlabLogo: false,
        latexLogo: false,
        arduinoLogo: false,
        gitLogo: false,
        linuxLogo: false,
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
                    <p className='textAboutMe'>I am currently studying an <a className="degref" href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain. And, although I am deeply interested in the whole technology spectrum, I intend to persue a carreer in either <b>web development</b> or <b>cybersecurity</b>.</p>
                    <p className='textAboutMe'>Throughout these years, I had been studying the following programming languages:</p>
                    <div class="wrapper">
                        <div class="one" onMouseOver={(e) => {showLogo(e, 'pyLogo');}} onMouseOut={(e) => {hideLogo(e, 'pyLogo');}}>
                            {!visibleLogo['pyLogo'] && <p className='textGrid'>Python</p>}
                            {visibleLogo['pyLogo'] && <i class="devicon-python-plain" style={{fontSize:'48px'}}/>}
                        </div>
                        <div class="two" onMouseOver={(e) => {showLogo(e, 'goLogo');}} onMouseOut={(e) => {hideLogo(e, 'goLogo');}}>
                            {!visibleLogo['goLogo'] && <p className='textGrid'>Go</p>}
                            {visibleLogo['goLogo'] && <i class="devicon-go-original-wordmark colored" style={{fontSize:'48px'}} />}
                        </div>
                        <div class="three" onMouseOver={(e) => {showLogo(e, 'cLogo');}} onMouseOut={(e) => {hideLogo(e, 'cLogo');}}>
                            {!visibleLogo['cLogo'] && <p className='textGrid'>C</p>}
                            {visibleLogo['cLogo'] && <i class="devicon-c-line" style={{fontSize:'48px'}} />}
                        </div>
                        <div class="four" onMouseOver={(e) => {showLogo(e, 'assemblyLogo');}} onMouseOut={(e) => {hideLogo(e, 'assemblyLogo');}}>
                            {!visibleLogo['assemblyLogo'] && <p className='textGrid'>Assembly</p>}
                            {visibleLogo['assemblyLogo'] && <i class="devicon-aarch64-plain" style={{fontSize:'48px'}} />}
                        </div>
                        <div class="five" onMouseOver={(e) => {showLogo(e, 'jsLogo');}} onMouseOut={(e) => {hideLogo(e, 'jsLogo');}}>
                            {!visibleLogo['jsLogo'] && <p className='textGrid'>Javascript</p>}
                            {visibleLogo['jsLogo'] && <i class="devicon-javascript-plain colored" style={{fontSize:'48px'}} />}
                        </div>
                        <div class="six" onMouseOver={(e) => {showLogo(e, 'htmlLogo');}} onMouseOut={(e) => {hideLogo(e, 'htmlLogo');}}>
                            {!visibleLogo['htmlLogo'] && <p className='textGrid'>HTML</p>}
                            {visibleLogo['htmlLogo'] && <i class="devicon-html5-plain colored" style={{fontSize:'48px'}} />}
                        </div>
                        <div class="seven" onMouseOver={(e) => {showLogo(e, 'cssLogo');}} onMouseOut={(e) => {hideLogo(e, 'cssLogo');}}>
                            {!visibleLogo['cssLogo'] && <p className='textGrid'>CSS</p>}
                            {visibleLogo['cssLogo'] && <i class="devicon-css3-plain colored" style={{fontSize:'48px'}} />}
                        </div>
                        <div class="eight" onMouseOver={(e) => {showLogo(e, 'reactLogo');}} onMouseOut={(e) => {hideLogo(e, 'reactLogo');}}>
                            {!visibleLogo['reactLogo'] && <p className='textGrid'>React JS</p>}
                            {visibleLogo['reactLogo'] && <i class="devicon-react-original colored" style={{fontSize:'48px'}} />}
                        </div>
                    </div>
                    <p className='textAboutMe'>Additionally, I had been introduced to several technologies, software and other tools:</p>
                    <div class="wrapper">
                        <div class="one" onMouseOver={(e) => {showLogo(e, 'matlabLogo');}}onMouseOut={(e) => {hideLogo(e, 'matlabLogo');}}>
                            {!visibleLogo['matlabLogo'] && <p className='textGrid'>Matlab/Octave</p>}
                            {visibleLogo['matlabLogo'] && <i class="devicon-matlab-plain" style={{fontSize:'48px'}}/>}
                        </div>
                        <div class="two">
                            <p className='textGrid'>NI Multisim</p>
                        </div>
                        <div class="three">
                            <p className='textGrid'>Intel Quartus (ModelSim)</p>
                        </div>
                        <div class="four" onMouseOver={(e) => {showLogo(e, 'latexLogo');}}onMouseOut={(e) => {hideLogo(e, 'latexLogo');}}>
                            {!visibleLogo['latexLogo'] && <p className='textGrid'>LaTeX</p>}
                            {visibleLogo['latexLogo'] && <i class="devicon-latex-original" style={{fontSize:'48px'}}/>}
                        </div>
                        <div class="five" onMouseOver={(e) => {showLogo(e, 'arduinoLogo');}}onMouseOut={(e) => {hideLogo(e, 'arduinoLogo');}}>
                            {!visibleLogo['arduinoLogo'] && <p className='textGrid'>Arduino</p>}
                            {visibleLogo['arduinoLogo'] && <i class="devicon-arduino-plain" style={{fontSize:'48px'}}/>}
                        </div>
                        <div class="six" onMouseOver={(e) => {showLogo(e, 'gitLogo');}}onMouseOut={(e) => {hideLogo(e, 'gitLogo');}}>
                            {!visibleLogo['gitLogo'] && <p className='textGrid'>Git/SVN</p>}
                            {visibleLogo['gitLogo'] && <i class="devicon-git-plain colored" style={{fontSize:'48px'}}/>}
                        </div>
                        <div class="seven" onMouseOver={(e) => {showLogo(e, 'linuxLogo');}}onMouseOut={(e) => {hideLogo(e, 'linuxLogo');}}>
                            {!visibleLogo['linuxLogo'] && <p className='textGrid'>Linux</p>}
                            {visibleLogo['linuxLogo'] && <i class="devicon-linux-plain" style={{fontSize:'48px'}}/>}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}





