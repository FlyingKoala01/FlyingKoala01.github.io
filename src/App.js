import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "./components/pages/Main";
import Navbar from "./components/Navbar";
import Aboutme from './components/pages/Aboutme';
import Portfolio from './components/pages/Portfolio';
import ContactMe from './components/pages/ContactMe';

import './App.css';

export default function App() {



  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/AboutMe' element={<Aboutme />} />
          <Route path='/Portfolio' element={<Portfolio />} />
          <Route path='/ContactMe' element={<ContactMe />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  )
}
