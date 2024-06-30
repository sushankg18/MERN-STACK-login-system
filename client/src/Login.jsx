import React, { useState, useEffect } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = ({setIsLoggedIn}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        if ([email, password].some((field) => field.trim() === "")) {
            alert("PLEASE FILL ALL THE FIELDS")
        } else {

            try {
                const respone = await axios.post('http://localhost:5000/api/v1/users/login', {
                    email,
                    password
                }, {
                    headers: {
                        'Content-Type': "application/json"
                    },
                }
                )
                if (respone.status === 200) {
                    setIsLoggedIn(true)
                    alert("User Logged In Successfully")
                    navigate('/');
                    console.log(respone)
                }
            } catch (err) {
                if (err.response && err.response.data) {
                    alert("User not found!!")
                    setError(err.response)
                } else {
                    setError('An error occurred')
                }
                console.log('ERROR', error)
            }
        }
    }


    return (
        <div className='login-main'>
            <div className='login-form-div'>
                <h1 className='login-heading'>Welcome Back !!!</h1>

                <div className="login-inp-fields">

                    <label>Enter email Id or Username</label>
                    <input type='text' maxLength={30} value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    <label>Enter password</label>
                    <div>
                        <input type={showPassword ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        <span onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />
                            }
                        </span>
                    </div>

                    <button onClick={handleLogin}>Login</button>

                    <p>don't have an account? <span onClick={() => { navigate('/user/register') }}>Sign Up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login