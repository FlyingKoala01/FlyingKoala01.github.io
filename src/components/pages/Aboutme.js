import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

import '../../App.css';
export default function Aboutme() {
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
                    <p className='textAboutMe'>Raised in a <b>bilingual</b> family, spending most of my childhood travelling in between countries, Before I turned 20 I had lived in Italy, Spain, Russia and Mexico. As a result, I've learnt <b>4</b> languages at a <b>proficient</b> level (English, Italian, Spanish and Catalan).</p>
                    <p className='textAboutMe'> Nevertheless, my expatriate experience taught me more than languages. I sincerely believe it has taught me the ability to <b>adapt</b> to change and to work in any given workspace and culture.</p>
                    <p className='textAboutMe'>I'm a focused and independent person, interested in partaking in stimulating projects for the greater good. </p>
                    <p className='textAboutMe'></p>
                </div>
                <div className='engineerDiv'>
                    <h2 className='subtitlePage'>as an engineer</h2>
                    <p className='textAboutMe'>I am currently studying an <a className="degref" href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain. And, although I am deeply interested in the whole technology spectrum, I intend to persue a carreer in either <b>web development</b> or <b>cybersecurity</b>.</p>
                    <p className='textAboutMe'>Throughout these years, I had been studying the following programming languages:</p>
                    <div class="wrapper">
                        <div class="one">
                            <i class="devicon-python-plain" style={{fontSize:'40px'}}/>
                        </div>
                        <div class="two">
                            <i class="devicon-go-original-wordmark colored" style={{fontSize:'40px'}} />
                        </div>
                        <div class="three" >
                            <i class="devicon-c-plain colored" style={{fontSize:'40px'}} />
                        </div>
                        <div class="four">
                            <i class="devicon-aarch64-plain" style={{fontSize:'40px'}} />
                        </div>
                        <div class="five" >
                            <i class="devicon-javascript-plain colored" style={{fontSize:'40px'}} />
                        </div>
                        <div class="six">
                            <i class="devicon-html5-plain colored" style={{fontSize:'40px'}} />
                        </div>
                        <div class="seven">
                            <i class="devicon-css3-plain colored" style={{fontSize:'40px'}} />
                        </div>
                        <div class="eight">
                            <i class="devicon-react-original colored" style={{fontSize:'40px'}} />
                        </div>
                    </div>
                    <p className='textAboutMe'>Additionally, I had introduced several technologies, software and other tools to my everyday work:</p>
                    <div class="wrapper">
                        <div class="one">
                            <i class="devicon-matlab-plain" style={{fontSize:'40px'}}/>
                        </div>
                        <div class="two">
                            <i class="devicon-latex-original" style={{fontSize:'40px'}}/>
                        </div>
                        <div class="three">
                            <i class="devicon-git-plain colored" style={{fontSize:'40px'}}/>
                        </div>
                        <div class="four">
                            <i class="devicon-linux-plain" style={{fontSize:'40px'}}/>
                        </div>
                        <div class="five">
                            <i class="devicon-arduino-plain" style={{fontSize:'40px'}}/>
                        </div>
                    </div>
                    <p className='textAboutMe'>Furthermore, throughout my University course I had been taught different software to an introductory level:</p>
                    <ul>
                        <li className='textAboutMe'>NI Multisim</li>
                        <li className='textAboutMe'>Intel Quartus (ModelSim)</li>
                        <li className='textAboutMe'>Others</li>
                    </ul>
                </div>
            </main>
        )
    }
}





