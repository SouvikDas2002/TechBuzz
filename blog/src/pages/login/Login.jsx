import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form action="" className="loginForm">
            <label>Email</label>
            <input type='email' placeholder='Enter your email...'/>
            <label>Password</label>
            <input type='password' placeholder='Enter your password...'/>
            <button className='loginButton'>Login</button>
        </form>
        <button className='RegisterButton'>
          <Link className='link' to="/register">Register</Link></button>
    </div>
  )
}
