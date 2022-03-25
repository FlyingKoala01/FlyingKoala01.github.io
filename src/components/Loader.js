import React from 'react'
import BarLoader from "react-spinners/BarLoader";

import '../App.css';
import mepx128 from '../Images/mepx/mepx128.png';
import mepx64 from '../Images/mepx/mepx64.png';
import mepx48 from '../Images/mepx/mepx48.png';
import mepx32 from '../Images/mepx/mepx32.png';

export default function Loader(props) {
    return (
        <div className='Loader'>
            <BarLoader width={220} color={"#FFFFFF"} />
            <div className='loaderLayout'>
                <div className='loaderText'>
                    {props.value}
                </div>
                <img
                    className='meLoader128'
                    alt={"PixelMe"}
                    src={mepx128}
                />
                <img
                    className='meLoader64'
                    alt={"PixelMe"}
                    src={mepx64}
                />
                <img
                    className='meLoader48'
                    alt={"PixelMe"}
                    src={mepx48}
                />
                <img
                    className='meLoader32'
                    alt={"PixelMe"}
                    src={mepx32}
                />
            </div>
        </div>
    )
}