import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import Screen from './pages/Screen'
import Search from './pages/Search'

// components
import Navbar from './components/Navbar'

import './App.css'

function App() {
  return (
    <>
      <Navbar />
      
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/screen' Component={Screen}></Route>
          <Route path='/search' Component={Search}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
