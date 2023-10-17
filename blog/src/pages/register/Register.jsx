import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPass]=useState("");
  const [error,setErr]=useState(false);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setErr(false);
    try{
    const res=await axios.post("/auth/register",{
      username,
      email,
      password
    })
    res.data && window.location.replace("/login");
  }catch(err){
    // console.log(res)
    setErr(true);
    }
  }

  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form action="" className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='Enter your name'
            onChange={e=>setUserName(e.target.value)}
            />
            <label>Email</label>
            <input type='email' placeholder='Enter your email...'
            onChange={e=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input type='password' placeholder='Enter your password...'
            onChange={e=>setPass(e.target.value)}
            />
            <button className='registerButton'>Register</button>
        </form>
        <button className='LoginButton'>
          <Link className='link' to='/login'>Login</Link></button>
          {error && <span style={{color:"red",marginTop:"10px"}}>Email already Exist</span>}
    </div>
  )
}
