import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './dashboard.css';
import profile from "../images/profile.jpg"
import { useDispatch } from 'react-redux';
import { setLoggedOut } from '../state/authSlice';  

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLoggedOut());
    navigate('/login');
  };
  return (
    <div>
      <header className="dashboard-header">
        <div className="logo">Welcome to Dashboard</div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item"><a href="#home">Home</a></li>
            <li className="nav-item"><a href="#about">About</a></li>
            <li className="nav-item"><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="logout-button" onClick={handleLogout}>Logout</div>
      </header>
      <main className='bg-light'>
        <div className="profile-card p-3">
          <img src={profile} alt="Profile" className="profile-photo" />
          <div className="profile-details px-3 py-2">
            <h2>Shaikh Waleed</h2>
            <hr />
            <p>Email: codesense@gmail.com</p>
            <p>Phone: +123456789</p>
            <p>Address: 123 Main St, City</p>
          </div>
        </div>
        <div className="profile-card p-3 my-3">
          <img src={profile} alt="Profile" className="profile-photo" />
          <div className="profile-details px-3 py-2">
            <h2>Shaikh Waleed</h2>
            <hr />
            <p>Email: codesense@gmail.com</p>
            <p>Phone: +123456789</p>
            <p>Address: 123 Main St, City</p>
          </div>
        </div>
      </main>
      <footer>
        <p>© Copyright 2023 - 2023 Codesense All rights reserved</p>
      </footer>
    </div>
  );
};

export default Dashboard;
