import React, {useContext} from 'react'
import { UserContext } from './context/userContext.js'
import { useNavigate } from 'react-router-dom'


const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const {user} = useContext(UserContext)

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/user/login')
  }
  return (
    <div className='home-main'>
      <div className='home-main-header'>
        <h1 className='home-heading'>HOME PAGE </h1>
        {
          isLoggedIn ?
            <button onClick={handleLogout}>Logout</button> :
            <h1 className='home-login' onClick={() => { navigate('/user/login') }}>Login</h1>
        }
      </div>
      <h1>WELCOME, {user ? user.fullName : null}</h1>
      <div>
        <h1 className='home-register' onClick={() => { navigate('/user/register') }}>Register</h1>
      </div>
    </div>
  )
}

export default Home
