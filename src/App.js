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
            <Route path='/' element={<Main />}/>
            <Route path='/AboutMe' element={<Aboutme />}/>
            <Route path='/Portfolio' element={<Portfolio />}/>
            <Route path='/ContactMe' element={<ContactMe />}/>
        </Routes>
        <Navbar />
      </Router>
      )}
    </div>
  )
}


