import React, { useState } from 'react'
import { Button } from '../Button.js';
import { motion } from 'framer-motion/dist/es/index'

import '../../App.css';


const AboutMe_line1 = "Who am I, who am I, who am I."
const AboutMe_line2 = "I dont know, I dont know."
const Travelling_line1 = "During my twenty years I had moved back and forth between Italy and Spain."
const Travelling_line2 = "During my late teenage years I moved to Russia and Mexico to later come back and continue my studies in Europe."
const University_line1 = "I began my University career persueing a career in mathematics to later discover it was not my right path."
const University_line2 = "I therefore began my studies in ICT, opening myself to the seemingly infinite world of technology."
const Future_line1 = "Once I obtain my engineering degree I would like to persue a Master in Computer Science to later specialize in cybersecurity."
const Future_line2 = "However, I intend to expand further my studies in Web Development."


export default function Aboutme() {
    let [showHideChildHood, setShowHideChildHood] = useState(false);
    let [showHideTravelling, setShowHideTravelling] = useState(false);
    let [showHideUniversity, setShowHideUniversity] = useState(false);
    let [showHideFuture, setShowHideFuture] = useState(false);

    return (

        <main className='aboutMeBackground'>
            <div className='Childhood'>
                {showHideChildHood && <motion.p className="textChildhood" variants={sentence} initial="hidden" animate="visible">
                    {AboutMe_line1.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                    <br />
                    {AboutMe_line2.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                </motion.p>}
                <Button buttonType="glowButton" onClick={() => {
                    setShowHideChildHood(!showHideChildHood);
                    setShowHideTravelling(showHideTravelling = false);
                    setShowHideUniversity(showHideUniversity = false);
                    setShowHideFuture(showHideFuture = false)
                }}>Childhood</Button>
            </div>
            <div className='Travelling'>
                {showHideTravelling && <motion.p className="textTravelling" variants={sentence} initial="hidden" animate="visible">
                    {Travelling_line1.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                    <br />
                    {Travelling_line2.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                </motion.p>}
                <Button buttonType="glowButton" onClick={() => {
                    setShowHideChildHood(showHideChildHood = false);
                    setShowHideTravelling(!showHideTravelling);
                    setShowHideUniversity(showHideUniversity = false);
                    setShowHideFuture(showHideFuture = false)
                }}>Travelling</Button>
            </div>
            <div className='University'>
                {showHideUniversity && <motion.p className="textUniversity" variants={sentence} initial="hidden" animate="visible">
                    {University_line1.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                    <br />
                    {University_line2.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                </motion.p>}
                <Button buttonType="glowButton" onClick={() => {
                    setShowHideChildHood(showHideChildHood = false);
                    setShowHideTravelling(showHideTravelling = false);
                    setShowHideUniversity(!showHideUniversity);
                    setShowHideFuture(showHideFuture = false)
                }}>University</Button>
            </div>
            <div className='Future'>
                {showHideFuture && <motion.p className="textFuture" variants={sentence} initial="hidden" animate="visible">
                    {Future_line1.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                    <br />
                    {Future_line2.split("").map((char, index) => {
                        return (
                            <motion.span key={char + "-" + index} variants={letter}>
                                {char}
                            </motion.span>
                        )
                    })}
                </motion.p>}
                <Button buttonType="glowButton" onClick={() => {
                    setShowHideChildHood(showHideChildHood = false);
                    setShowHideTravelling(showHideTravelling = false);
                    setShowHideUniversity(showHideUniversity = false);
                    setShowHideFuture(!showHideFuture)
                }}>Future</Button>
            </div>

            <div>
                <img src={'../../Images/me.png'} className='myFace' alt="" />
            </div>
        </main>
    )
}

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.08,
        },
    },
}

const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0
    },
}



