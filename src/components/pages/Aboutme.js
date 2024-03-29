import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

import '../../App.css';
export default function Aboutme() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            await new Promise((r) => setTimeout(r, 2500));

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
                    <p className='textAboutMe'>Raised in a <b>bilingual</b> family, spending most of my childhood travelling in between countries, before the age of 20 I had lived in Italy, Spain, Russia and Mexico. As a result, I've learnt to speak <b>4</b> languages at a <b>proficient</b> level (English, Italian, Spanish and Catalan).</p>
                    <p className='textAboutMe'> Nevertheless, my expatriate <b>experience</b> taught me more than just languages. I sincerely believe it has taught me the ability to <b>adapt</b> to change and to work in any given workspace and culture.</p>
                    <p className='textAboutMe'>I'm a focused and independent individual, interested in partaking in stimulating projects for the greater good. </p>
                    <p className='textAboutMe'></p>
                </div>
                <div className='engineerDiv'>
                    <h2 className='subtitlePage'>as an engineer</h2>
                    <p className='textAboutMe'>I am currently studying for an <a className="degref" href='https://www.upc.edu/en/bachelors/ict-systems-engineering-manresa-epsem' alt="UPC EPSEM">ICT Engineering degree</a> in Spain. Although I am deeply interested in the whole technology spectrum, I intend to persue a carreer in <b>cybersecurity</b>.</p>
                    <p className='textAboutMe'>Throughout the years, I have studied the following programming languages:</p>
                    <div className="wrapper">
                        <div className="one">
                            <i className="devicon-python-plain" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="two">
                            <i className="devicon-go-original-wordmark colored" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="three" >
                            <i className="devicon-c-plain colored" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="four">
                            <i className="devicon-aarch64-plain" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="five" >
                            <i className="devicon-javascript-plain colored" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="six">
                            <i className="devicon-html5-plain colored" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="seven">
                            <i className="devicon-css3-plain colored" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="eight">
                            <i className="devicon-react-original colored" style={{ fontSize: '40px' }} />
                        </div>
                    </div>
                    <p className='textAboutMe'>Additionally, I have been introduced to different technologies, which I have been implementing in my everyday work:</p>
                    <div className="wrapper">
                        <div className="one">
                            <i className="devicon-matlab-plain" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="two">
                            <i className="devicon-latex-original" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="three">
                            <i className="devicon-git-plain colored" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="four">
                            <i className="devicon-linux-plain" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="five">
                            <i className="devicon-arduino-plain" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="six">
                            <i className="devicon-raspberrypi-line colored" style={{ fontSize: '40px' }} />
                        </div>
                    </div>
                    <p className='textAboutMe'>Furthermore, throughout my University course I have been taught different software to an introductory level:</p>
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





