import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import './App.css';



export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' exact />
        </Routes>
        </Router>
      <Main />
    </>
  )
}