import React from 'react';

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



    return (
        <main className='main'>
             <div className="TextHome">
                <h1 className='myName'>isaac iglesias vila</h1>
                <h2 className='subtitle'>{content.subtitle_text}</h2>
            </div>
        </main>
    )
}