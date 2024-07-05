import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './sign.css';
import Apple from '../../assets/apples.svg';  // Correct path to the SVG file
import password_photo from '../../assets/password.svg';
import google from '../../assets/google.svg';
import email_photo from '../../assets/email.svg';
import user from '../../assets/yes.svg';
import { registerUser } from '../../service/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Sign() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setSuccessMessage("")
    setErrors({});
    const formdata  = {
      email:email,
      username:username,
      password:password,
      password2:password2,
      first_name:firstName,
      last_name:lastName
    }
    console.log(formdata)
    try{
    const response = await registerUser(formdata);
    console.log(response)
        try{
          if (response.data.token) {
              // Set token in cookies
              Cookies.set('token', response.data.token);
              // Redirect or update UI
              console.log('Logged in successfully');
          }
        }catch(error){
          setErrors({"msg":"Cookiee Error occureed"}) // Remove development code
        }
    setSuccessMessage(response.data.msg);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setUsername("");
    navigate('/Login');
    

    }catch(error){
      const {email, password,username,msg} = error.response.data
      setErrors({ email: email, username: username, password: password,msg:msg });
      console.log(error)
    }
}

  return (
    <div>
      <form className="sign-in-form">
        <div className="sign-in-flex-column">
          <label className="sign-in-label">First Name</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={user} alt="user" />
          <input 
          value={firstName}
          type="text" 
          className="sign-in-input" 
          placeholder="Enter your First Name" 
          onChange={(e)=>setFirstName(e.target.value)}
          />

        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Last Name</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={user} alt="user" />
          <input 
          value={lastName}
          type="text" 
          className="sign-in-input" 
          placeholder="Enter your Last Name" 
          onChange={(e)=>setLastName(e.target.value)}
          />
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Username</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={user} alt="username" />
          <input 
          value={username}
          type="text" 
          className="sign-in-input" 
          placeholder="username" 
          onChange={(e)=>setUsername(e.target.value)}
          />
        </div>
        {errors.username && <p className="error-text">{errors.username}</p>}



        <div className="sign-in-flex-column">
          <label className="sign-in-label">Email</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={email_photo} alt="email" />
          <input 
          value={email}
          type="text" 
          className="sign-in-input" 
          placeholder="Enter your Email" 
          onChange={(e)=>setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Password</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={password_photo} alt="password" />
          <input 
          value={password}
          type="password" 
          className="sign-in-input" 
          placeholder="Enter your Password" 
          onChange={(e)=>setPassword(e.target.value)}
          />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M288 160a64 64 0 1064 64 64.072 64.072 0 00-64-64zm0 104a40 40 0 1140-40 40.045 40.045 0 01-40 40zm192-24c0 48.6-64 128-192 128S96 288.6 96 240s64-128 192-128 192 79.4 192 128zm-32 0c0-36.4-58.6-96-160-96s-160 59.6-160 96 58.6 96 160 96 160-59.6 160-96z" />
          </svg>
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Confirm Password</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={password_photo} alt="password" />
          <input 
          value={password2}
          type="password" 
          className="sign-in-input" 
          placeholder="Confirm your Password" 
          onChange={(e)=>setPassword2(e.target.value)}
          />
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}

        <div className="sign-in-flex-row">
          <div>
            <input type="checkbox" />
            <label className="sign-in-label">Remember me</label>
          </div>
          <span className="sign-in-span">Forgot password?</span>
        </div>
        {errors.msg && <p className="error-text">{errors.msg}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}
        <button 
        className="sign-in-button-submit"
        onClick={handleSubmit}
        >
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
