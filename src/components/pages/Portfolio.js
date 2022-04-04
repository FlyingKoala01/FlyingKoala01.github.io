import React, { useState, useEffect } from 'react'

import Loader from '../Loader';
import emptyBackground from '../../Images/emptybackground.png';
import kaliImage from '../../Images/KaliLogo.png';
import reactProject from '../../Images/reactProject.png';

import '../../App.css';
import {HiOutlineArrowCircleUp, HiOutlineArrowCircleDown} from "react-icons/hi";
export default function Projects() {

  const projectsInfo = {
    0: {
      itemTitle: 'itemZeroTitle',
      cardTitleText: '',
      cardDateText: '',
      cardhref: '',
      cardSRC: emptyBackground,
      cardALT:"EMPTY"
    },
    1: {
      itemTitle: 'itemOneTitle',
      cardTitleText: 'REACT',
      cardDateText: '04.22',
      cardhref: 'https://github.com/FlyingKoala01/Website',
      cardSRC: reactProject,
      cardALT:"REACT"
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'FUTURE',
      cardDateText: '.22',
      cardhref: 'https://github.com/FlyingKoala01/',
      cardSRC: kaliImage,
      cardALT:"KALI"
    },
    3: {
      itemTitle: 'itemZeroTitle',
      cardTitleText: '',
      cardDateText: '',
      cardhref: '',
      cardSRC:emptyBackground,
      cardALT:"EMPTY"
    },
  }

  const [index, setIndex] = useState(1);

  const itemTitle = {
    itemOneTitle: false,
    itemTwoTitle: false,
    itemThirdTitle: false,
  };

  const [visibleTitle, setVisibleTitle] = useState(itemTitle);

  const showTitle = (key) => {
    setVisibleTitle({ ...visibleTitle, ...{ [key]: true } });
    setIndex(index+1);
    console.log(index);
  };

  const hideTitle = (key) => {
    setVisibleTitle({ ...visibleTitle, ...{ [key]: false } });
    setIndex(index-1);
    console.log(index);
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
        <div className='prevArea' onClick={() => {showTitle(projectsInfo[index].itemTitle); hideTitle(projectsInfo[index-1].itemTitle);}}>
          {(index !== 0) && <i className='prevText'><HiOutlineArrowCircleUp/></i>}
        </div>
        <div className='cardsContainer'>
          <div className='itemOne'>
            <img
              className='cardsItemImg'
              alt='itemOne'
              src={projectsInfo[index].cardSRC}
            />
          </div>
          <div className='itemSecond'>
            <a href={projectsInfo[index + 1].cardhref} className="cardLinks">
              <img
                className='cardsItemImg'
                alt='itemTwo'
                src={(projectsInfo[index+1].cardSRC)}
              />
            </a>
          </div>
          <div className='itemThird'>
            <img
              className='cardsItemImg'
              alt='itemThree'
              src={(projectsInfo[index+2].cardSRC)}
            />
          </div>
        </div>
        {visibleTitle[projectsInfo[index + 1].itemTitle] &&
          <div className='cardTitle'>
            <p className='cardTitleText'>{projectsInfo[index + 1].cardTitleText}</p>
          </div>}
        {visibleTitle[projectsInfo[index + 1].itemTitle] &&
          <div className='cardDate'>
            <p className='cardDateText'>{projectsInfo[index + 1].cardDateText}</p>
          </div>}
        <div className='nextArea' onClick={() => {showTitle(projectsInfo[index].itemTitle); hideTitle(projectsInfo[index-1].itemTitle);}}>
          { (index !== (Object.keys(projectsInfo).length-3)) && <i className='nextText'><HiOutlineArrowCircleDown/></i>}
        </div>
      </div>
    );
  }
}