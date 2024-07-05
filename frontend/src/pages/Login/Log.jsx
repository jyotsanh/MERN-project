import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Log.css';
import Apple from '../../assets/apples.svg';  // Correct path to the SVG file
import password_photo from '../../assets/password.svg';
import google from '../../assets/google.svg';
import email_photo from '../../assets/email.svg';
import { LoginUser } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Log() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formdata = {
      email:email,
      password:password
    }
    console.log(formdata)
    try {
      const response = await LoginUser(formdata);
      console.log(response);
      try{

        if(response.token) {
            // Set token in cookies
            Cookies.set('token', response.token);
            // Redirect or update UI
            console.log('User Logged in successfully');
            setError('');
        }
      }catch(error){
          setError("Cookiee Error occureed") // Remove development code
      }
      setSuccess(response.msg);
      navigate('/');
      
    } catch (error) {
      
      setSuccess('');
      console.log(error.response);
      if (error.response && error.response) {
          setError(error.response.password);
      } else {
          setError('An unexpected error occurred');
      }
    }
  }
  return (
    <div>
      <form className="form">
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <img src={email_photo} alt="email" />
          <input 
          value={email}
          type="email" 
          className="input" 
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>

        <div className="inputForm">

          <img src={password_photo} alt="password" />

          <input 
          value={password}
          type="password" 
          className="input" 
          placeholder="Enter your Password" 
          onChange={(e) => setPassword(e.target.value)}
          />

          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">

            <path d="M288 160a64 64 0 1064 64 64.072 64.072 0 00-64-64zm0 104a40 40 0 1140-40 40.045 40.045 0 01-40 40zm192-24c0 48.6-64 128-192 128S96 288.6 96 240s64-128 192-128 192 79.4 192 128zm-32 0c0-36.4-58.6-96-160-96s-160 59.6-160 96 58.6 96 160 96 160-59.6 160-96z" />
          </svg>

        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button 
        className="button-submit"
        onClick={handleSubmit}
        >
          Sign In
        </button>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <p className="p">
          Don't have an account? <span className="span">
            <Link to="/sign">Sign Up</Link>
          </span>
        </p>
        <p className="p line">Or With</p>
        <div className="flex-row">
          <button className="btn google">
            <img src={google} alt="Google" />
            Google
          </button>
          <button className="btn apple">
            <img src={Apple} alt="Apple" />
            Apple
          </button>
        </div>
      </form>
    </div>
  );
}

export default Log;
