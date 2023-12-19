// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from './state/authSlice';
import { setUser } from './state/userSlice';   
import Login from './components/Login';
import Signup from "./components/Singup";
import Dashboard from './components/Dashboard';
import "./App.css"
import { set } from 'mongoose';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = window.localStorage.getItem("token");
  
  const getUserData = async()=>{
    try {
      const response = await fetch("http://localhost:5000/get-user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token: window.localStorage.getItem("token")})
      })
      if(response.ok){
        const data = await response.json()
        if(data.success === true){
          dispatch(setLoggedIn())
          dispatch(setUser(data.user))
        }

      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(()=>{
    if(window.localStorage.getItem("token")){
      getUserData();
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
