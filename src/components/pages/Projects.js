import React from 'react';

import '../Cards.css';
import CardItem from '../Projects_card';

export default function Projects() {
    return (
        <div className='cards'>
          <h1>Projects</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                <CardItem
                  src={require('C:/Users/isaac/Desktop/PC/PERSONAL/website/src/Images/React.png')}
                  text='Learnt React.JS and Node.JS by developing my personal website. The objective is, in a future, develop another website and learn the MERN stack.'
                  label='React Portfolio'
                  path='/'
                />
                <CardItem
                  src={require('C:/Users/isaac/Desktop/PC/PERSONAL/website/src/Images/Python.png')}
                  text='Simple project to practice Python'
                  label='Python Tetris'
                  path='/'
                />
              </ul>
              <ul className='cards__items'>
                <CardItem
                  src={require('C:/Users/isaac/Desktop/PC/PERSONAL/website/src/Images/React.png')}
                  text='Studying for Security+'
                  label='Cybersecurity'
                  path='/'
                />
              </ul>
            </div>
          </div>
        </div>
    );
}

