import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserContext, UserProvider } from './context/userContext.js';
import Login from './Login.jsx'
import Register from './Register.jsx';
import "../src/App.css";
import Home from './Home.jsx';
function App() {

    const setUser = useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const userInfo = Cookies.get('user');

    if (accessToken && userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

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
    <>
      <UserProvider>  
        <Router>
          <Routes>
            <Route exact path='/' element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
            <Route exact path='/user/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route exact path='/user/register' element={<Register />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
