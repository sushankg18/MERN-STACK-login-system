import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx';
import "../src/App.css";
import Home from './Home.jsx';
function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
        </Routes>
      </Router>
  )
}

export default App
