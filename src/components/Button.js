import React from "react";
import './Button.css';

const TYPE = [
    "btn",
    "glowButton",
    "socialButton"
]


export const Button = ({children, type, onClick, buttonType}) => {

    const checkButtonType  = TYPE.includes(buttonType)   ? buttonType  : TYPE[0];

    return (
        <button className={`${checkButtonType}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
