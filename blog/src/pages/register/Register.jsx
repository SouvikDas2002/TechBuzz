import React from 'react'
import './register.css'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form action="" className="registerForm">
            <label>Username</label>
            <input type='text' placeholder='Enter your name'/>
            <label>Email</label>
            <input type='email' placeholder='Enter your email...'/>
            <label>Password</label>
            <input type='password' placeholder='Enter your password...'/>
            <button className='registerButton'>Register</button>
        </form>
        <button className='LoginButton'>
          <Link className='link' to='/login'>Login</Link></button>
    </div>
  )
}
