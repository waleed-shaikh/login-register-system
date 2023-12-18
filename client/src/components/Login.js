// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setLoggedIn } from '../state/authSlice'; 
import './login.css';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
    dispatch(setLoggedIn());
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form>
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
            placeholder='Email'
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
            placeholder='Password'
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
