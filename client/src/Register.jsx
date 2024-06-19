import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import axios from 'axios'
const Register = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()

    try {


      const response = await axios.post('http://localhost:5000/api/v1/users/register', {
        email,
        password,
        userName: username,
        fullName: fullname 
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert("USER CREATED SUCCESSFULLY")
      navigate('/users/login')
      console.log(response)
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message)
      } else {
        setError('An error occurred')
      }
      console.log('ERROR', error)
    }

  }



  return (
    <div className='register-main'>
      <div className='register-form-div'>
        <h1 className='register-heading'>Register Now</h1>

        <form className="register-inp-fields" >

          <label>Full name</label>
          <input type='text' maxLength={30} onChange={(e) => { setFullname(e.target.value) }} value={fullname} />

          <label>Username</label>
          <input type='text' maxLength={20} onChange={(e) => { setUsername(e.target.value.toLowerCase()) }} value={username} />

          <label>Email id</label>
          <input type='text' maxLength={50} onChange={(e) => { setEmail(e.target.value.toLowerCase()) }} value={email} />

          <label>Password</label>
          <div>
            <input type={showPassword ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <span onClick={() => { setShowPassword(!showPassword) }}>
              {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />
              }
            </span>
          </div>

          <button onClick={handleRegister}>register</button>

          <p onClick={() => { navigate('/user/login') }}>Already a user?</p>
        </form>
      </div>
    </div>
  )
}

export default Register
