import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx';
import "../src/App.css";
import Home from './Home.jsx';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const loggedInState = localStorage.getItem('isLoggedIn');
    if (loggedInState) {
      setIsLoggedIn(JSON.parse(loggedInState));
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route exact path='/user/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path='/user/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
