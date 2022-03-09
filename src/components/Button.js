import React from "react";
import './Button.css';

const TYPE = [
    "btn",
    "glowButton"
]

const STYLE = [
    "btn--primary--solid",
    "btn--primary--outline",
    "glowButton--primary"
]

const SIZE = [
    "btn--medium",
    "btn--small",
    "glowButton--size"
]

export const Button = ({children, type, onClick, buttonType,buttonStyle, buttonSize}) => {

    const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
    const checkButtonSize  = SIZE.includes(buttonSize)   ? buttonSize  : SIZE[0];
    const checkButtonType  = TYPE.includes(buttonType)   ? buttonType  : TYPE[0];

    return (
        <button className={`${checkButtonType} ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
