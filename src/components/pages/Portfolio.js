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
      cardInfoText: '',
      cardhref: '',
      cardSRC: emptyBackground,
      cardALT:"EMPTY"
    },
    1: {
      itemTitle: 'itemOneTitle',
      cardTitleText: 'WEBSITE',
      cardInfoText: 'Developed my portfolio website with self-taught web development',
      cardhref: 'https://github.com/FlyingKoala01/Website',
      cardLangs: ['devicon-javascript-plain colored', 'devicon-html5-plain colored', 'devicon-css3-plain colored', 'devicon-react-original colored'],
      cardSRC: reactProject,
      cardALT:"REACT"
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'CYBERSECURITY',
      cardInfoText: 'Independent studies on malware scripting',
      cardhref: 'https://github.com/FlyingKoala01/',
      cardLangs: ['devicon-go-original-wordmark colored', '', '', ''],
      cardSRC: kaliImage,
      cardALT:"KALI"
    },
    3: {
      itemTitle: 'itemZeroTitle',
      cardTitleText: '',
      cardhref: '',
      cardSRC:emptyBackground,
      cardALT:"EMPTY"
    },
  }

  const [index, setIndex] = useState(0);

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
        <div className='prevArea' onClick={() => {setIndex(index-1)}}>
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
          <div className='cardTitle'>
            <p className='cardTitleText'>{projectsInfo[index + 1].cardTitleText}</p>
          </div>
          <div className='cardInfo'>
            <p className='cardInfoText'>{projectsInfo[index + 1].cardInfoText}</p>
          </div>
          <div class="wrapperPortfolio">
            <div class="one">
                <i class={(projectsInfo[index+1].cardLangs[0])} style={{ fontSize: '80px' }} />
            </div>
            <div class="two">
                <i class={(projectsInfo[index+1].cardLangs[1])} style={{ fontSize: '80px' }} />
            </div>
            <div class="three" >
                <i class={(projectsInfo[index+1].cardLangs[2])} style={{ fontSize: '80px' }} />
            </div>
            <div class="four">
                <i class={(projectsInfo[index+1].cardLangs[3])} style={{ fontSize: '80px' }} />
            </div>
        </div>
        <div className='nextArea' onClick={() => {setIndex(index+1)}}>
          { (index !== (Object.keys(projectsInfo).length-3)) && <i className='nextText'><HiOutlineArrowCircleDown/></i>}
        </div>
      </div>
    );
  }
}