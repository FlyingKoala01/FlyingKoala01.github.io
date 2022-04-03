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
              src={require('../../Images/reactProject.PNG')}
              text='Learnt React.JS by developing my personal website. The objective is, in a future, develop another website and learn the MERN stack.'
              label='React Portfolio'
              path='/'
              Title='REACT'
              Date='03.22'
            />
            <CardItem
              position='itemSecond'
              src={require('../../Images/Python.png')}
              text='Incoming...'
              label='Future'
              path='/'
            />
            <CardItem
              position='itemThird'
              src={require('../../Images/Python.png')}
              text='Incoming...'
              label='Future'
              path='/'
            />
        </div>
      </div>
    );
  }
}

