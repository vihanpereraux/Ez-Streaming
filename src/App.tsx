import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import MovieScreen from './pages/MovieScreen'
import TvScreen from './pages/TvScreen'
import Search from './pages/Search'

// components
import Navbar from './components/Navbar'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/'  Component={Home}></Route>
          <Route path='/screen/movie' Component={MovieScreen}></Route>
          <Route path='/screen/tv' Component={TvScreen}></Route>
          <Route path='/search' Component={Search}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

