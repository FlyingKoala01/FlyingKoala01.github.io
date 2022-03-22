import React, {useState, useEffect} from 'react'
import BarLoader from "react-spinners/BarLoader";
import '../../App.css';

export default function Main()  {

    // Set loading state to true initially
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Loading function to load data or 
        // fake it using setTimeout;
        const loadData = async () => {
    
        // Wait for two second
        await new Promise((r) => setTimeout(r, 2000));
    
        // Toggle loading state
        setLoading((loading) => !loading);
        };
        
        loadData();
    }, [])
          
    // If page is in loading state, display 
    // loading message. Modify it as per your 
    // requirement.
    if (loading) {
        return <div className='Loader'><BarLoader size = {150} color = {"#FFFFFF"} loading = {loading}/>Im Loading </div>
    }
    else {

    return (
        <main className='main'>
             <div className="TextHome">
                <h1 className='myName'>isaac iglesias vila</h1>
                <h2 className='subtitle'>An aspiring ICT engineer interested in<br></br> the many diverse fields concerning technology.</h2>
            </div>
        </main>
        )
    }
}