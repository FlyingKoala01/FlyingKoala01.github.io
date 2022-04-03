import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Loader from '../Loader'

import '../../App.css';

export default function Projects() {

  const itemTitle = {
    itemOneTitle: false,
    itemTwoTitle: false,
  };

  const [visibleTitle, setVisibleTitle] = useState(itemTitle);

  const showTitle = (event, key) => {
    event.preventDefault();
    console.log("IN");
    setVisibleTitle({ ...visibleTitle, ...{ [key]: true } });
    console.log(itemTitle);
  };

  const hideTitle = (event, key) => {
    event.preventDefault();
    console.log("OUT");
    setVisibleTitle({ ...visibleTitle, ...{ [key]: false } });
    console.log(itemTitle);
  };

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
          <Link to='/'className="cardLinks">
            <div className='itemOne' onMouseOver={(e) => {showTitle(e, 'itemOneTitle');}} onMouseOut={(e) => {hideTitle(e, 'itemOneTitle');}}>
                <img
                  className='cardsItemImg'
                  alt='React Portfolio'
                  src={require('../../Images/reactProject.PNG')}
                />
                <div className='cardsItemInfo'>
                  <p className='cardsItemText'>Learnt React.JS by developing my personal website. The objective is, in a future, develop another website and learn the MERN stack.</p>
                </div>
            </div>
          </Link>
          <Link to='/'className="cardLinks">
            <div className='itemSecond' onMouseEnter={e => {showTitle(e, 'itemTwoTitle')}} onMouseLeave={e => {hideTitle(e, 'itemTwoTitle')}}>
                <img
                  className='cardsItemImg'
                  alt='Future'
                  src={require('../../Images/KaliLogo.png')}
                />
                <div className='cardsItemInfo'>
                  <p className='cardsItemText'>Incoming</p>
                </div>
            </div>
          </Link>
        </div>
        {visibleTitle['itemOneTitle'] &&
        <div className='cardTitle' style={{top:'0%', animation: 'moveright 1s ease forwards'}}>
          <p className='cardTitleText'>REACT<br></br>WEBSITE</p>
        </div>}
        {visibleTitle['itemOneTitle'] &&
        <div className='cardDate'style={{top:'0%', animation: 'moveleft 1.5s ease forwards 0.5s'}}>
          <p className='cardDateText'>DEPLOYED<br></br>04.22</p>
        </div>}
        {visibleTitle['itemTwoTitle'] &&
        <div className='cardTitle' style={{top:'30%', left: '40%', animation: 'moveleft 1.5s ease forwards 0.5s'}}>
          <p className='cardTitleText'>FUTURE</p>
        </div>}
        {visibleTitle['itemTwoTitle'] &&
        <div className='cardDate' style={{top:'30%', left: '30%', animation: 'moveright 1s ease forwards'}}>
          <p className='cardDateText'>.22</p>
        </div>}
      </div>
    );
  }
}

