import React from 'react';
import Particles from "react-tsparticles";


import '../../App.css';



export default function Main(props)  {
    let content = {
        en: {
            subtitle_text: "An aspiring ICT engineer interested in the many diverse fields concerning technology."
        },
        it:{
            subtitle_text: "Futuro ingegnere TIC interessato nei tanti diversi campi legati alla tecnologia."
        },
        es:{
            subtitle_text: "Futuro Ingeniero de TIC interesado en los diversos campos relacionados con la tecnología."
        }
    };
console.log(props.value);
    switch (props.value) {
        case 'it':
            content = content.it;
            break;
        case 'es':
            content = content.es;
            break;
        case 'en':
            content = content.en;
            break;
        default:
            content = content.en;
            break;
    };

    const particlesInit = (main) => {
        console.log(main);
      };
    const particlesLoaded = (container) => {
        console.log(container);
      };

    return (
        <main className='main'>
             <div className="TextHome">
                <h1 className='myName'>isaac iglesias vila</h1>
                <h2 className='subtitle'>{content.subtitle_text}</h2>
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