import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';

// pages
import Home from './pages/home'
import MovieScreen from './pages/movie-screen'
import LiveTV from './pages/tv'
import TvScreen from './pages/tv-screen'
import Search from './pages/search'
import Disclaimer from './pages/disclaimer'
import WatchHistory from './pages/watch-history'
import Games from './pages/games'
import Movies from './pages/movies'
import TvShows from './pages/tv-shows'
import WatchList from './pages/watch-list';
// components
import FooterDisclaimer from './components/footer-disclaimer'

const App: React.FC = () => {
  return (
    <>
      <div style={{
        opacity: location.pathname == '/disclaimer' ? .105 : .05
      }}
        className="gradient-background"></div>
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
          <Route path='/watch-list' Component={WatchList}></Route>
        </Routes>
        <FooterDisclaimer />
      </BrowserRouter>
      <Analytics />
    </>
  )
}

export default App

