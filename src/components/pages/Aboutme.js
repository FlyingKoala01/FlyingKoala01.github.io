import React, {useState, useEffect} from 'react'
import Loader from '../Loader'

import '../../App.css';

export default function Aboutme() {

    // Set loading state to true initially
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Loading function to load data or 
        // fake it using setTimeout;
        const loadData = async () => {
    
        // Wait for two second
        await new Promise((r) => setTimeout(r, 1500));
    
        // Toggle loading state
        setLoading((loading) => !loading);
        };
        
        loadData();
    }, [])
          
    // If page is in loading state, display 
    // loading message. Modify it as per your 
    // requirement.
    if (loading) {
        return <Loader />}
    
        else {
    return (
        <main className='aboutMeBackground'>
            <div className='glassmorphism'>
                <p className='textAboutMe'>{}</p>
                <p className='textAboutMe'>{}</p>
                <p className='textAboutMe'>{}</p>
                <p className='textAboutMe'>{}</p>
            </div>
            <div>
                <img src={'../../Images/me.png'} className='myFace' alt="" />
            </div>
        </main>
        )
    }
}





