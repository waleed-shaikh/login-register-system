// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setLoggedIn } from '../state/authSlice'; 
import { setUser } from '../state/userSlice'; 
import './login.css';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      })
      if(response.ok){
        const data = await response.json()
        alert(data.message)
        window.localStorage.setItem("token", data.token)
        dispatch(setLoggedIn())
        dispatch(setUser(data.user))
        window.location.href = "/dashboard"

      } else {
        const error = await response.json()
        alert(error.message)
        console.log(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='button' type="button" onClick={handleLogin}>
          Login
        </button>
        <p className='signup-link'>
          Not registered yet? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
