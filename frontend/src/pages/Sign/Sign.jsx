import React from 'react';
import { Link } from 'react-router-dom';
import './sign.css';
import Apple from '../../assets/apples.svg';  // Correct path to the SVG file
import password from '../../assets/password.svg';
import google from '../../assets/google.svg';
import email from '../../assets/email.svg';
import user from '../../assets/yes.svg';

function Sign() {
  return (
    <div>
      <form className="sign-in-form">
        <div className="sign-in-flex-column">
          <label className="sign-in-label">First Name</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={user} alt="user" />
          <input type="text" className="sign-in-input" placeholder="Enter your First Name" />
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Last Name</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={user} alt="user" />
          <input type="text" className="sign-in-input" placeholder="Enter your Last Name" />
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Email</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={email} alt="email" />
          <input type="text" className="sign-in-input" placeholder="Enter your Email" />
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Password</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={password} alt="password" />
          <input type="password" className="sign-in-input" placeholder="Enter your Password" />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M288 160a64 64 0 1064 64 64.072 64.072 0 00-64-64zm0 104a40 40 0 1140-40 40.045 40.045 0 01-40 40zm192-24c0 48.6-64 128-192 128S96 288.6 96 240s64-128 192-128 192 79.4 192 128zm-32 0c0-36.4-58.6-96-160-96s-160 59.6-160 96 58.6 96 160 96 160-59.6 160-96z" />
          </svg>
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Confirm Password</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={password} alt="password" />
          <input type="password" className="sign-in-input" placeholder="Confirm your Password" />
        </div>

        <div className="sign-in-flex-row">
          <div>
            <input type="checkbox" />
            <label className="sign-in-label">Remember me</label>
          </div>
          <span className="sign-in-span">Forgot password?</span>
        </div>
        <button className="sign-in-button-submit">
          Sign Up
        </button>
        <p className="sign-in-p">
          Already have an account? <span className="sign-in-span">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
        <p className="sign-in-p sign-in-line">Or With</p>
        <div className="sign-in-flex-row">
          <button className="sign-in-btn sign-in-google">
            <img src={google} alt="Google" />
            Google
          </button>
          <button className="sign-in-btn sign-in-apple">
            <img src={Apple} alt="Apple" />
            Apple
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sign;
