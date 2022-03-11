import React from 'react';
import Particles from "react-tsparticles";

import '../../App.css';

export default function Main() {

    const particlesInit = (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      };
    
    const particlesLoaded = (container) => {
        console.log(container);
      };

    return (
        <main className='main'>
             <div className="TextHome">
                <h1 className='myName'>isaac iglesias vila</h1>
                <h2 className='subtitle'>An aspiring ICT engineer interested in the<br></br> many diverse fields concerning technology.</h2>
            </div>
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
                    events: {
                        onClick: {
                        enable: true,
                        mode: "push",
                        },
                        onHover: {
                        enable: true,
                        mode: "connect",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                        quantity: 4,
                        },
                        repulse: {
                        distance: 200,
                        duration: 0.4,
                        },
                        connect: {
                            distance: 100, 
                            links : {
                                opacity: 0.5
                            },
                            radius: 180
                        }
                    },
                    },
                    particles: {
                    color: {
                        value: "#000",
                    },
                    links: {
                        color: "#000",
                        distance: 80,
                        enable: true,
                        opacity: 0.5,
                        width: 0.5,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "top",
                        enable: true,
                        outMode: "out",
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                        enable: true,
                        area: 600,
                        },
                        value: 60,
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
        </main>
    )
}