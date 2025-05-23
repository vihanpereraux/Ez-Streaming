import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';

// pages
import Home from './pages/Home'
import MovieScreen from './pages/MovieScreen'
import LiveTV from './pages/TV'
import TvScreen from './pages/TvScreen'
import Search from './pages/Search'
import Disclaimer from './pages/Disclaimer'
import WatchHistory from './pages/watch-history'
import Games from './pages/Games'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'

// components
import FooterDisclaimer from './components/footer-disclaimer'

const App: React.FC = () => {
  return (
    <>
      <div className="gradient-background"></div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/screen/movie' Component={MovieScreen}></Route>
          <Route path='/screen/tv' Component={TvScreen}></Route>
          <Route path='/movies' Component={Movies}></Route>
          <Route path='/tv-shows' Component={TvShows}></Route>
          <Route path='/live-tv' Component={LiveTV}></Route>
          <Route path='/watch-history' Component={WatchHistory}></Route>
          <Route path='/search' Component={Search}></Route>
          <Route path='/disclaimer' Component={Disclaimer}></Route>
          <Route path='/games' Component={Games}></Route>
        </Routes>
      </BrowserRouter>
      <FooterDisclaimer />

      <Analytics />
    </>
  )
}

export default App

