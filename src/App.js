import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "./components/pages/Main"
import Banner from "./components/Banner"
import Navbar from "./components/Navbar"
import Aboutme from './components/pages/Aboutme';
import Portfolio from './components/pages/Portfolio';
import ContactMe from './components/pages/ContactMe';

import './App.css';

export default function App() {

  const [sound, setSound] = useState(false);

  const turnOnOff = () => {
    setSound(!sound);
  }

  return (
    <div className='App'>
      <Router>
        <Banner />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/AboutMe' element={<Aboutme />} />
          <Route path='/Portfolio' element={<Portfolio />} />
          <Route path='/ContactMe' element={<ContactMe />} />
        </Routes>
        <button className='settingsSound' onClick={turnOnOff}>{sound ? <ion-icon name="play-outline"></ion-icon> : <ion-icon name="pause-outline"></ion-icon>}Sound</button>
        <Navbar />
      </Router>

    </div>
  )
}
