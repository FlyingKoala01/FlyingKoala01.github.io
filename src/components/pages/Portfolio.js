import React, { useState, useEffect } from 'react'

import CardItem from '../Projects_card';
import Loader from '../Loader'

import '../../App.css';

export default function Projects() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {

      await new Promise((r) => setTimeout(r, 3000));

      setLoading((loading) => !loading);
    };

    loadData();
  }, [])

  if (loading) {
    return <Loader value={"Take a look at what I've been working on!"} />
  }
  else {
    return (
      <div className='portfolioSection'>
        <div className='cardsContainer'>
            <CardItem
              position='itemOne'
              src={require('../../Images/React.png')}
              text='Learnt React.JS and Node.JS by developing my personal website. The objective is, in a future, develop another website and learn the MERN stack.'
              label='React Portfolio'
              path='/'
            />
            <CardItem
              position='itemSecond'
              src={require('../../Images/React.png')}
              text='Simple project to practice Python'
              label='Python Tetris'
              path='/'
            />
            <CardItem
              position='itemThree'
              src={require('../../Images/React.png')}
              text='Studying for Security+'
              label='Cybersecurity'
              path='/'
            />
        </div>
      </div>
    );
  }
}

