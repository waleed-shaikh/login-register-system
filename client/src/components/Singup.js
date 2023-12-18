// src/components/Signup.js
import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './singup.css'; // Import your custom CSS

const Signup = () => {
  const [form, setForm] = useState({fname:'', lname:'', email:'', password:''})

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form )
      })
      if(response.ok){
        const data = await response.json()
        console.log(data)
        alert(data.message)
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
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            First Name:
          </label>
          <input
            onChange={handleChange}
            required
            name="fname"
            type="text"
            className="input"
            value={form.fname}
            placeholder='First Name'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">
            Last Name:
          </label>
          <input
            onChange={handleChange}
            required
            name="lname"
            type="text"
            className="input"
            value={form.lname}
            placeholder='Last Name'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            onChange={handleChange}
            required
            name="email"
            type="email"
            className="input"
            value={form.email}
            placeholder='Email'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            onChange={handleChange}
            required
            name="password"
            type="password"
            className="input"
            value={form.password}
            placeholder='Password'
          />
        </div>
        <button type="submit" className="button" >
          Register
        </button>
        <p className="login-link">
          Already registered? <Link to="/login">Please login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
