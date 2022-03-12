import React, {useState} from 'react'
import { Send } from 'emailjs'

import SocialFollow from "../SocialFollow"
import { Button } from '../Button.js';

import '../../App.css';


export default function ContactMe() {
    
    const [sender_name, set_sender_name] = useState('');
    const [sender_email, set_sender_email] = useState('');
    const [message, set_message] = useState('');

    const handleName = (e) => {
        set_sender_name(e.target.value)
    }
    const handleEmail = (e) => {
        set_sender_email(e.target.value)
    }
    const handleMessage = (e) => {
        set_message(e.target.value)
    }

    const sendMail = (e) => {
        e.preventDefault();
        Send(
            '',
            '',
            {sender_name, sender_email, message},
            ''
        )
        .then((response) =>{
            console.log('Email send successfully', response.status, response.text)
        })
        .catch((err) => {
            console.log('failed', err)
        })
    }
    return (
        <div>
            <SocialFollow />
            <h1>Contact Me</h1>
            <form onSubmit={sendMail}>
                <input type = "text" name = "sender_name" value = {sender_name} onChange = {handleName} required placeholder = "Your Name"/>
                <input type="email" name = "sender_email" value = {sender_email} onChange = {handleEmail} required placeholder = "Your Email" />
                <textarea type="message" value = {message} onChange = {handleMessage} required placeholder = "Your Message" />
                <Button>Send Email</Button>
            </form>
        </div>
    )
}

