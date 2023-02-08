import React, { useState, useEffect } from 'react'

import Loader from '../Loader';
import emptyBackground from '../../Images/emptybackground.png';
import proxmox_logo from '../../Images/proxmox_logo.png';
import HTB from '../../Images/HTB.png';
import pfSense from '../../Images/pf_sense.png'
import burpsuite from '../../Images/burpsuite.png'
import kali from '../../Images/kali.png'
import offsec from '../../Images/offsec.png'

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
      cardLangs: ['https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'],
      cardIndex: '00',
      cardALT:"REACT"
    },
    2: {
      itemTitle: 'itemTwoTitle',
      cardTitleText: 'PenTest',
      cardInfoText: 'Learning the basics of Offensive Security by pwning machines on HackTheBox! Looking for the OSCP and other certs',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: [kali,HTB, offsec, ''],
      cardIndex: '01',
    },
    3: {
      itemTitle: 'itemThreeTitle',
      cardTitleText: 'WebSec',
      cardInfoText: 'Learning the basics of Web Application Security by following BurpSuite course! Learning about SQLi, XXS, Web Sockets and more! ',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: ['',burpsuite,'',''],
      cardIndex: '02',
    },
    4: {
      itemTitle: 'itemFourTitle',
      cardTitleText: 'HomeLab',
      cardInfoText: 'Developing my homelab to learn about services, systems administration, networking and much more!',
      cardhref: 'https://github.com/FlyingKoala01/Scripts',
      cardLangs: [proxmox_logo, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original-wordmark.svg', pfSense,''],
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
              <img src={(projectsInfo[index+1].cardLangs[0])} alt=""/>
          </div>
          <div class="two">
              <img src={(projectsInfo[index+1].cardLangs[1])} alt=""/>
          </div>
          <div class="three" >
              <img src={(projectsInfo[index+1].cardLangs[2])} alt=""/>
          </div>
          <div class="four">
              <img src={(projectsInfo[index+1].cardLangs[3])} alt=""/>
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