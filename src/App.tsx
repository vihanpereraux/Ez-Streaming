import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

// pages
import Home from './pages/Home'
import MovieScreen from './pages/MovieScreen'
import TvScreen from './pages/TvScreen'
import Search from './pages/Search'
import Disclaimer from './pages/Disclaimer'
import Games from './pages/Games'

// components
import Navbar from './components/Navbar'

import './App.css'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/screen/movie' Component={MovieScreen}></Route>
          <Route path='/screen/tv' Component={TvScreen}></Route>
          <Route path='/search' Component={Search}></Route>
          <Route path='/disclaimer' Component={Disclaimer}></Route>
          <Route path='/games' Component={Games}></Route>
        </Routes>
      </BrowserRouter>

      <Analytics />
    </>
  )
}

export default App

