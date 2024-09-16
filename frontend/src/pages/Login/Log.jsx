import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Log.css';
import Apple from '../../assets/apples.svg';
import password_photo from '../../assets/password.svg';
import google from '../../assets/google.svg';
import email_photo from '../../assets/email.svg';
import { LoginUser } from '../../service/api';
import Cookies from 'js-cookie';

import { FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Import tick and cross icons

function Log() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAlert, setShowAlert] = useState(false);  // Control visibility of the alert
  const [alertType, setAlertType] = useState('');     // Type of alert: 'success' or 'failure'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowAlert(false);  // Hide alert before the submission

    const formdata = {
      email: email,
      password: password
    };

    console.log(formdata);
    try {
      const response = await LoginUser(formdata);
      console.log(response);

      if (response.token) {
        // Set token in cookies
        Cookies.set('token', response.token);
        // Show success alert
        setSuccess('Login Successful');
        setAlertType('success');
        setShowAlert(true); // Show the success alert

        setTimeout(() => {
          setShowAlert(false); // Hide the alert after 3 seconds
          navigate('/');
        }, 3000);  // Redirect after 3 seconds
      }
    } catch (error) {
      // Show failure alert
      setError('Login Unsuccessful');
      setAlertType('failure');
      setShowAlert(true);  // Show the failure alert

      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds
      }, 3000);  // Alert will disappear after 3 seconds
    }
  };

  return (
    <div>
      {/* Form Section */}
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

        {/* {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>} */}

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

      {/* Alert Section */}
      {showAlert && (
        <div className={`alert ${alertType}`}>
          {alertType === 'success' ? (
            <>
              <FiCheckCircle className="icon" />
              <span>{success}</span>
            </>
          ) : (
            <>
              <FiXCircle className="icon" />
              <span>{error}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Log;
