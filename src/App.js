import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";

import Main from "./components/pages/Main"
import Banner from "./components/Banner"
import Navbar from "./components/Navbar"
import Aboutme from './components/pages/Aboutme';
import Portfolio from './components/pages/Portfolio';
import ContactMe from './components/pages/ContactMe';

import './App.css';

export default function App() {

  const [lang, setLang] = useState('');
  
  const changeLang = (button_lang, event) => {
    setLang(`${button_lang}`);
  };

  const [languagesMenu, setLanguage] = useState(false);

  const expandLanguages = (event) => {
    setLanguage(!languagesMenu);
  }

  const [settings, setSettings] = useState(false);

  const expandSettings = (event) => {
    setSettings(!settings);
  }

  const [sound, setSound] = useState(false);

  const turnOnOff = (event) => {
    setSound(!sound);
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <div className='App'>
      
      {loading ? (<div className='Loader'><RingLoader size = {150} color = {"#FFFFFF"} loading = {loading}/> </div>
      ) : (
      <Router>
        <Banner />
        <Routes>
            <Route path='/' element={<Main value={lang}/>}/>
            <Route path='/AboutMe' element={<Aboutme value={lang}/>}/>
            <Route path='/Portfolio' element={<Portfolio value={lang}/>}/>
            <Route path='/ContactMe' element={<ContactMe value={lang}/>}/>
        </Routes>
        <Navbar />
        <div className='settingsPage'>
          <button className="settingsGear" onClick={expandSettings}><ion-icon name="settings-outline"></ion-icon></button>
          {settings && <div className='settingsExpanded'>
            <button className='settingsSound' onClick={turnOnOff}>{sound ? <ion-icon name="play-outline"></ion-icon>: <ion-icon name="pause-outline"></ion-icon>} </button>
            <div className='langIcons'>
              <button className='settingsLang' onClick={expandLanguages}><ion-icon name="language-outline"></ion-icon></button>
              {languagesMenu && <div className='langList'>
                <button className='en' value = "en" onClick={e => changeLang(e.target.value)}>English</button>
                <button className='es' value = "es" onClick={e => changeLang(e.target.value)}>Español</button>
                <button className='it' value = "it" onClick={e => changeLang(e.target.value)}>Italiano</button>
              </div>}
            </div>
          </div>}
        </div>
      </Router>
      )}
    </div>
  )
}


/*props={lang.chosenLang}*/ 