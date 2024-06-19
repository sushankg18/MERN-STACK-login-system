import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='home-main'>
      <h1 className='home-heading'>HOME PAGE </h1>
      <h1>SHOPPING WEBSITE HERE ...</h1>
      <div>
        <h1 className='home-login' onClick={() => { navigate('/user/login') }}>Login</h1>
        <h1 className='home-register' onClick={() => { navigate('/user/register') }}>Register</h1>
      </div>
    </div>
  )
}

export default Home
