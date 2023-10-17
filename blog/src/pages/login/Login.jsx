import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Login() {

  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context)

  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"Login_start"});
    try{
      const res=await axios.post("/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      dispatch({type:"Login_Success",payload:res.data});
    }catch(err){
      dispatch({type:"Login_failure"});
    }
  }
  // console.log(user);
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='Enter your name...' ref={userRef}/>
            <label>Password</label>
            <input type='password' placeholder='Enter your password...' ref={passwordRef}/>
            <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
        </form>
        <button className='RegisterButton'>
          <Link className='link' to="/register">Register</Link></button>
    </div>
  )
}
