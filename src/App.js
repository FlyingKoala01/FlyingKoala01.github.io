import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";

import Main from "./components/pages/Main"
import Navbar from "./components/Navbar"
import Aboutme from './components/pages/Aboutme';
import Projects from './components/pages/Projects';
import WorkInProgress from './components/pages/WorkInProgress';
import ContactMe from './components/pages/ContactMe';

import './App.css';


export default function App() {
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
        <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/AboutMe' element={<Aboutme />}/>
            <Route path='/Projects' element={<Projects />}/>
            <Route path='/InProgress' element={<WorkInProgress />}/>
            <Route path='/ContactMe' element={<ContactMe />}/>
        </Routes>
        <Navbar />
      </Router>
      )}
    </div>
  )
}


