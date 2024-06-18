import React from 'react'
import {useNavigate} from 'react-router-dom'


const Home = () => {
 const navigate = useNavigate()
  return (
    <div className='home-main'>
      <h1>HOME PAGE </h1>

      <h1 onClick={()=>{navigate('/user/login')}}>Login</h1>
      <h1 onClick={()=>{navigate('/user/register')}}>Register</h1>
    </div>
  )
}

export default Home
