import React, { useState, useEffect } from 'react'

import '../Cards.css';
import CardItem from '../Projects_card';
import Loader from '../Loader'

export default function Projects() {

  // Set loading state to true initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading function to load data or 
    // fake it using setTimeout;
    const loadData = async () => {

      // Wait for two second
      await new Promise((r) => setTimeout(r, 3000));

      // Toggle loading state
      setLoading((loading) => !loading);
    };

    loadData();
  }, [])

  // If page is in loading state, display 
  // loading message. Modify it as per your 
  // requirement.
  if (loading) {
    return <Loader value={"Take a look at what I've been working on!"} />
  }
  else {
    return (
      <div className='cards'>
        <h1>Portfolio</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src={require('../../Images/React.png')}
                text='Learnt React.JS and Node.JS by developing my personal website. The objective is, in a future, develop another website and learn the MERN stack.'
                label='React Portfolio'
                path='/'
              />
              <CardItem
                src={require('../../Images/Python.png')}
                text='Simple project to practice Python'
                label='Python Tetris'
                path='/'
              />
            </ul>
            <ul className='cards__items'>
              <CardItem
                src={require('../../Images/React.png')}
                text='Studying for Security+'
                label='Cybersecurity'
                path='/'
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

