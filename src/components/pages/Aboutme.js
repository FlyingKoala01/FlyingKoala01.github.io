import React, {useState, useEffect} from 'react'
import { Button } from '../Button.js';
import '../../App.css';

export default function Aboutme() {
    this.setState = {
        showMessage: false
    }

    return (
        <main>
            <div className='childhood'>
                {this.state.showMessage && <p>Hi</p>}
                <Button onClick={() => {this.setState({showMessage: true})}}>childhood</Button> 
            </div>
        </main>
    )
}

