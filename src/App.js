import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import Main from "./components/pages/Main"
import Navbar from "./components/Navbar"
import Aboutme from './components/pages/Aboutme';
import Projects from './components/pages/Projects';
import WorkInProgress from './components/pages/WorkInProgress';

import './App.css';



export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/AboutMe' element={<Aboutme />}/>
            <Route path='/Projects' element={<Projects />}/>
            <Route path='/InProgress' element={<WorkInProgress />}/>
        </Routes>
      </Router>
    </>
  )
}


