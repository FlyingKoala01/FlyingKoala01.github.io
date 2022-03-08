import React, {useState} from 'react'
import { Button } from '../Button.js';
import '../../App.css';

export default function Aboutme() {
    let [showHideChildHood, setShowHideChildHood] = useState(false);
    let [showHideTravelling, setShowHideTravelling] = useState(false);
    let [showHideUniversity, setShowHideUniversity] = useState(false);
    let [showHideFuture, setShowHideFuture] = useState(false);

    return (
        <main>
            <div className='Childhood'>
                {showHideChildHood && <p className='trial'>Childhood Section</p>}
                <Button buttonType="glowButton" onClick={() => {setShowHideChildHood(!showHideChildHood); 
                    setShowHideTravelling(showHideTravelling = false); 
                    setShowHideUniversity(showHideUniversity = false);
                    setShowHideFuture(showHideFuture = false)
                    }}>Childhood</Button> 
            </div>
            <div className='Travelling'>
                {showHideTravelling && <p className='trial'>Travelling Section</p>}
                <Button buttonType="glowButton" onClick={() => {setShowHideChildHood(showHideChildHood = false); 
                    setShowHideTravelling(!showHideTravelling); 
                    setShowHideUniversity(showHideUniversity = false);
                    setShowHideFuture(showHideFuture = false)
                    }}>Travelling</Button> 
            </div>
            <div className='University'>
                {showHideUniversity && <p className='trial'>University Section</p>}
                <Button buttonType="glowButton" onClick={() => {setShowHideChildHood(showHideChildHood = false); 
                    setShowHideTravelling(showHideTravelling = false);
                    setShowHideUniversity(!showHideUniversity);
                    setShowHideFuture(showHideFuture = false)
                    }}>University</Button> 
            </div>
            <div className='Future'>
                {showHideFuture && <p className='trial'>Future Section</p>}
                <Button buttonType="glowButton" onClick={() => {setShowHideChildHood(showHideChildHood = false); 
                    setShowHideTravelling(showHideTravelling = false);
                    setShowHideUniversity(showHideUniversity = false);
                    setShowHideFuture(!showHideFuture) 
                    }}>Future</Button> 
            </div>
        </main>
    )
}

