import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Log.css';
import Apple from '../../assets/apples.svg';
import password_photo from '../../assets/password.svg';
import google from '../../assets/google.svg';
import email_photo from '../../assets/email.svg';
import { LoginUser } from '../../service/api';
import Cookies from 'js-cookie';

import { FiCheckCircle, FiXCircle, FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons

function Log() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowAlert(false);

    const formdata = {
      email: email,
      password: password
    };

    console.log(formdata);
    try {
      const response = await LoginUser(formdata);
      console.log(response);

      if (response.token) {
        Cookies.set('token', response.token);
        setSuccess('Login Successful');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setError('Login Unsuccessful');
      setAlertType('failure');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

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
        <div className="inputForm password-input">
          <img src={password_photo} alt="password" />
          <input
            value={password}
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            className="input"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Eye icon for showing/hiding password */}
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button className="button-submit" onClick={handleSubmit}>
          Sign In
        </button>

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
