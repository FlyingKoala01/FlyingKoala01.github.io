import React, {useState} from 'react'

import SocialFollow from "../SocialFollow"
import { Button } from '../Button.js';

import '../../App.css';


export default function ContactMe() {
    
    const [sender_name, set_sender_name] = setState('');
    const [sender_email, set_sender_email] = setState('');
    const [message, set_message] = setState('');
    return (
        <div>
            <SocialFollow />
            <h1>Contact Me</h1>
            <form>
                <input type = "text" name = "sender_name" value = {sender_name} required_placeholder = "Your Name"/>
                <input type="email" name = "sender_email" value = {sender_email} required_placeholder = "Your Email" />
                <textarea type="message" value = {message} required_placeholder = "Your Message" />
                <Button>Send Email</Button>
            </form>
        </div>
    )
}

