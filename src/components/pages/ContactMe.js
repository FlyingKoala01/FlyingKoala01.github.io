import React from 'react'
import Particles from "react-tsparticles";

import SocialFollow from "../SocialFollow"

import '../../App.css';
import europe from '../../Images/europe.png';

export default function ContactMe() {
    const particlesInit = (main) => {
        console.log(main);
    };
    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <div className='backgroundContactMe'>
            <div className='europeMap'>
                <img src={europe} className='europe' alt="" />
            </div>
            <div className='contactMe'>
                <SocialFollow />
                <div className="wrap">
                    <div className="circle">
                    <i className="icon i1 icon-terminal"></i>
                    <i className="icon i2 icon-code-fork"></i>
                    <i className="icon i3 icon-keyboard"></i>
                    <i className="icon i4 icon-code"></i>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <span className="text">hover on me</span>
                    </div>
                    </div>
                <h1>Contact Me</h1>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            opacity: 0
                        },
                        fpsLimit: 120,
                        interactivity: {
                            modes: {
                                push: {
                                    quantity: 2,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                                connect: {
                                    distance: 200,
                                    links: {
                                        opacity: 0.5
                                    },
                                    radius: 180
                                }
                            },
                        },
                        particles: {
                            color: {
                                value: "#D3D3D3",
                            },
                            links: {
                                color: "#D3D3D3",
                                distance: 120,
                                enable: true,
                                opacity: 0.5,
                                width: 0.5,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outMode: "out",
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 600,
                                },
                                value: 20,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: 2,
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div>

        </div>

    )
}

