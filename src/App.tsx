import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import Screen from './pages/Screen'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/screen' Component={Screen}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
