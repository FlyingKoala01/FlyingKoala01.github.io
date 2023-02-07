import React, { useState, useEffect } from 'react'

import Loader from '../Loader';
import emptyBackground from '../../Images/emptybackground.png';

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
      cardTitleText: 'WebDev.',
      cardInfoText: 'Developed my first personal website. My first self-taught front-end project. Learning HTML, CSS, JS using React',
      cardhref: 'https://github.com/FlyingKoala01/Website',
      cardLangs: ['devicon-javascript-plain colored', 'devicon-html5-plain colored', 'devicon-css3-plain colored', 'devicon-react-original colored'],
      cardIndex: '00',
      cardALT:"REACT"
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'PenTest',
      cardInfoText: 'Learning the basics of Offensive Security by pwning machines on HackTheBox! ',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: '',
      cardIndex: '01',
    },
    3: {
      itemTitle: 'itemThreeTitle',
      cardTitleText: 'WebSec',
      cardInfoText: 'Learning the basics of Web Application Security by following BurpSuite course! Learning about SQLi, XXS, Web Sockets and more! ',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: '',
      cardIndex: '02',
    },
    4: {
      itemTitle: 'itemFourTitle',
      cardTitleText: 'HomeLab',
      cardInfoText: 'Developing my homelab to learn about services, systems administration, networking and much more!',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: '',
      cardIndex: '03',
    },
    5: {
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
          <div className='cardTitle'>
              <p className='cardTitleText'>{projectsInfo[index].cardTitleText}</p>
            </div>
          </div>
          <div className='itemSecond'>
            <div className='cardTitle'>
              <p className='cardTitleTextCenter'>{projectsInfo[index + 1].cardTitleText}</p>
            </div>
          </div>
          <div className='itemThird'>
          <div className='cardTitle'>
              <p className='cardTitleText'>{projectsInfo[index + 2].cardTitleText}</p>
            </div>
          </div>
        </div>
        <div className='cardInfo'>
          <p className='cardInfoText'>{projectsInfo[index + 1].cardInfoText}</p>
        </div>
        <div class="wrapperPortfolio">
          <div class="one">
              <i class={(projectsInfo[index+1].cardLangs[0])}/>
          </div>
          <div class="two">
              <i class={(projectsInfo[index+1].cardLangs[1])}/>
          </div>
          <div class="three" >
              <i class={(projectsInfo[index+1].cardLangs[2])}/>
          </div>
          <div class="four">
              <i class={(projectsInfo[index+1].cardLangs[3])}/>
          </div>
        </div>
        <div className='indexBox'>
          <div className='indexNumber'>{(projectsInfo[index+1].cardIndex)}</div>      
        </div>
        <div className='nextArea' onClick={() => {setIndex(index+1)}}>
          { (index !== (Object.keys(projectsInfo).length-3)) && <i className='nextText'><HiOutlineArrowCircleDown/></i>}
        </div>
      </div>
    );
  }
}