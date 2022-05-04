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
      cardTitleText: 'PORTFOLIO',
      cardInfoText: 'Developed my personal website with self-taught web development through freeCodeCamp and other online courses',
      cardhref: 'https://github.com/FlyingKoala01/Website',
      cardLangs: ['devicon-javascript-plain colored', 'devicon-html5-plain colored', 'devicon-css3-plain colored', 'devicon-react-original colored'],
      cardSRC: reactProject,
      cardIndex: '00',
      cardALT:"REACT"
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'CYBERSECURITY',
      cardInfoText: 'Independent studies on malware scripting and studying for the Security+ by CompTIA',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: ['devicon-python-plain colored','devicon-aarch64-plain','devicon-go-original-wordmark colored', 'devicon-bash-plain'],
      cardSRC: kaliImage,
      cardIndex: '01',
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

  const [content, setContent] = useState(projectsInfo[0]);

  console.log(content);

  const [index, setIndex] = useState(0);
  console.log("RERENDER");
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