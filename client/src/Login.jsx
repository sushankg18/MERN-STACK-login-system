import React, { useState, useEffect } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='login-main'>
            <div className='login-form-div'>
                <h1 className='login-heading'>Welcome Back !!!</h1>

                <div className="login-inp-fields">

                    <label>Enter email Id</label>
                    <input type='text' maxLength={30} value={email} onChange={(e)=>{setEmail(e.target.value)}} />

                    <label>Enter password</label>
                    <div>
                        <input type={showPassword ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        <span onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />
                            }
                        </span>
                    </div>

                    <button>Login</button>

                    <p>don't have an account? <span onClick={() => { navigate('/user/register') }}>Sign Up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login