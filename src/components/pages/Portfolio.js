import React, { useState, useEffect } from 'react'

import Loader from '../Loader';

import '../../App.css';
import {HiOutlineArrowCircleUp, HiOutlineArrowCircleDown} from "react-icons/hi";
export default function Projects() {

  const projectsInfo = {
    0: {
      itemTitle: 'itemZeroTitle',
      cardTitleText: '',
      cardDateText: '',
      cardhref: '',
      cardSRC:'../../Images/emptybackground.png',
      cardALT:"EMPTY"
    },
    1: {
      itemTitle: 'itemOneTitle',
      cardTitleText: 'REACT',
      cardDateText: '04.22',
      cardhref: 'https://github.com/FlyingKoala01/Website',
      cardSRC:'../../Images/reactProject.PNG',
      cardALT:"REACT"
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'FUTURE',
      cardDateText: '.22',
      cardhref: 'https://github.com/FlyingKoala01/',
      cardSRC:'../../Images/KaliLogo.png',
      cardALT:"KALI"
    },
    3: {
      itemTitle: 'itemZeroTitle',
      cardTitleText: '',
      cardDateText: '',
      cardhref: '',
      cardSRC:'../../Images/emptybackground.png',
      cardALT:"EMPTY"
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
          {(index != 0) && <i className='prevText'><HiOutlineArrowCircleUp/></i>}
        </div>
        <div className='cardsContainer'>
          <div className='itemOne'>
            <img
              className='cardsItemImg'
              alt='itemOne'
              src={require("" + projectsInfo[index].cardSRC)}
            />
          </div>
          <div className='itemSecond' onMouseOver={(e) => { showTitle(e, projectsInfo[index + 1].itemTitle); }} onMouseOut={(e) => { hideTitle(e, projectsInfo[index + 1].itemTitle); }}>
            <a href={projectsInfo[index + 1].cardhref} className="cardLinks">
              <img
                className='cardsItemImg'
                alt='itemTwo'
                src={require(projectsInfo[index].cardSRC)}
              />
            </a>
          </div>
          <div className='itemThird'>
            <img
              className='cardsItemImg'
              alt='itemThree'
              src={require(projectsInfo[index].cardSRC)}
            />
          </div>
        </div>
        {visibleTitle[projectsInfo[index + 1].itemTitle] &&
          <div className='cardTitle' style={{ top: '0%', animation: 'moveright 1s ease forwards 0.5s' }}>
            <p className='cardTitleText'>{projectsInfo[index + 1].cardTitleText}</p>
          </div>}
        {visibleTitle[projectsInfo[index + 1].itemTitle] &&
          <div className='cardDate' style={{ top: '20%', animation: 'moveright 1s ease forwards' }}>
            <p className='cardDateText'>{projectsInfo[index + 1].cardDateText}</p>
          </div>}
        <div className='nextArea' onClick={() => setIndex(index + 1)}>
          { (index != 4) && <i className='nextText'><HiOutlineArrowCircleDown/></i>}
        </div>
      </div>
    );
  }
}