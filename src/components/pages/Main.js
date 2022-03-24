import React, { useState, useEffect } from 'react'
import Loader from '../Loader'
import MemoizedLayout from '../../components/Layout';

import '../../App.css';

export default function Main() {

    // Set loading state to true initially
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Loading function to load data or 
        // fake it using setTimeout;
        const loadData = async () => {

            // Wait for two second
            await new Promise((r) => setTimeout(r, 3500));

            // Toggle loading state
            setLoading((loading) => !loading);
        };

        loadData();
    }, [])

    // If page is in loading state, display 
    // loading message. Modify it as per your 
    // requirement.
    if (loading) {
        return <Loader value={"Isaac is rendering..."} />
    }
    else {

        return (
            <main className='main'>
                <div className="TextHome">
                    <h1 className='myName'>isaac iglesias vila</h1>
                    <h2 className='subtitle'>An aspiring ICT engineer interested in<br></br> the many diverse fields concerning technology.</h2>
                </div>
                <MemoizedLayout />
            </main>
        )
    }
}