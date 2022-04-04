import React, { useState, useEffect } from 'react'

import Loader from '../Loader';

import '../../App.css';

export default function Projects() {

  const projectsInfo = {
    0: {
      itemTitle: 'itemZeroTitle',
      cardTitleText: 'ZERO',
      cardDateText: 'NEVER',
      cardhref: 'https://github.com/FlyingKoala01/Website'
    },
    1: {
      itemTitle: 'itemOneTitle',
      cardTitleText: 'REACT',
      cardDateText: '04.22',
      cardhref: 'https://github.com/FlyingKoala01/Website'
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'FUTURE',
      cardDateText: '.22',
      cardhref: 'https://github.com/FlyingKoala01/Website'
    },
  }

  const [index, setIndex] = useState(0);
  console.log(projectsInfo['projectEmpty']);

  const itemTitle = {
    itemOneTitle: false,
    itemTwoTitle: false,
    itemThirdTitle: false,
  };

  const [visibleTitle, setVisibleTitle] = useState(itemTitle);

  const showTitle = (event, key) => {
    event.preventDefault();
    setVisibleTitle({ ...visibleTitle, ...{ [key]: true } });
  };

  const hideTitle = (event, key) => {
    event.preventDefault();
    setVisibleTitle({ ...visibleTitle, ...{ [key]: false } });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {

      await new Promise((r) => setTimeout(r, 2500));

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
        <div className='prevArea' onClick={() => setIndex(index - 1)}>
          <p className='prevText'>PREV</p>
        </div>
        <div className='cardsContainer'>
          <div className='itemOne'>
            <a href={projectsInfo[index].cardhref} className="cardLinks">
              <img
                className='cardsItemImg'
                alt='itemOne'
                src={require('../../Images/KaliLogo.png')}
              />
            </a>
          </div>
          <div className='itemSecond' onMouseOver={(e) => { showTitle(e, projectsInfo[index + 1].itemTitle); }} onMouseOut={(e) => { hideTitle(e, projectsInfo[index + 1].itemTitle); }}>
            <a href={projectsInfo[index + 1].cardhref} className="cardLinks">
              <img
                className='cardsItemImg'
                alt='itemTwo'
                src={require('../../Images/KaliLogo.png')}
              />
            </a>
          </div>
          <div className='itemThird'>
            <a href={projectsInfo[index + 2].cardhref} className="cardLinks">
              <img
                className='cardsItemImg'
                alt='itemThree'
                src={require('../../Images/KaliLogo.png')}
              />
            </a>
          </div>
        </div>
        {visibleTitle[projectsInfo[index + 1].itemTitle] &&
          <div className='cardTitle' style={{ top: '40%', left: '40%', animation: 'moveleft 1.5s ease forwards 0.5s' }}>
            <p className='cardTitleText'>{projectsInfo[index + 1].cardTitleText}</p>
          </div>}
        {visibleTitle[projectsInfo[index + 1].itemTitle] &&
          <div className='cardDate' style={{ top: '40%', left: '30%', animation: 'moveright 1s ease forwards' }}>
            <p className='cardDateText'>{projectsInfo[index + 1].cardTitleDate}</p>
          </div>}
        <div className='nextArea' onClick={() => setIndex(index + 1)}>
          <p className='nextText'>NEXT</p>
        </div>
      </div>
    );
  }
}