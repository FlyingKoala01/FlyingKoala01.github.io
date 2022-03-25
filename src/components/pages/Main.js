import React, { useState, useEffect } from 'react'
import Loader from '../Loader'
import MemoizedLayout from '../../components/Layout';

import '../../App.css';

export default function Main() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {

            await new Promise((r) => setTimeout(r, 3000));

            setLoading((loading) => !loading);
        };

        loadData();
    }, [])

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