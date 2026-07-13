import React, { useState, useEffect } from 'react'
import Loader from '../Loader'
import LandingAtlas from '../LandingAtlas';

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
            <main>
                <LandingAtlas />
            </main>
        )
    }
}