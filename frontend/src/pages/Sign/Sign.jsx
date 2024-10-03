import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sign.css';
import Apple from '../../assets/apples.svg';
import password_photo from '../../assets/password.svg';
import google from '../../assets/google.svg';
import email_photo from '../../assets/email.svg';
import user from '../../assets/yes.svg';
import { registerUser } from '../../service/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showPassword2, setShowPassword2] = useState(false); // State for confirm password visibility
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});
    setAlertMessage(null);
    setLoading(true); // Start loading

    const formdata = {
      email: email,
      username: username,
      password: password,
      password2: password2,
      first_name: firstName,
      last_name: lastName
    };

    // Simulate a 4-second loading delay
    setTimeout(async () => {
      try {
        const response = await registerUser(formdata);

        if (response.data.token) {
          Cookies.set('token', response.data.token);
          setAlertMessage('Registered successfully!');
          setAlertType('success');
          // Clear form fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setPassword2("");
          setUsername("");
          setLoading(false); // Stop loading
          setTimeout(() => {
            navigate('/Login');
          }, 1500);
        }

      } catch (error) {
        const { email, password, username, msg } = error.response.data;
        setErrors({ email: email, username: username, password: password, msg: msg });
        setAlertMessage('Registration failed. Please try again.');
        setAlertType('error');
        setLoading(false); // Stop loading
      }
    }, 4000); // 4-second delay
  };

  return (
    <div>
      {/* Alert message */}
      {alertMessage && (
        <div className={`alert alert-${alertType}`}>
          {alertMessage}
        </div>
      )}

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
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            type={showPassword ? "text" : "password"} // Toggle password visibility
            className="sign-in-input"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
          >
            {showPassword ? <FiEyeOff /> : <FiEye />} {/* Show/hide icon */}
          </span>
        </div>

        <div className="sign-in-flex-column">
          <label className="sign-in-label">Confirm Password</label>
        </div>
        <div className="sign-in-inputForm">
          <img src={password_photo} alt="password" />
          <input
            value={password2}
            type={showPassword2 ? "text" : "password"} // Toggle confirm password visibility
            className="sign-in-input"
            placeholder="Confirm your Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <span 
            className="toggle-password"
            onClick={() => setShowPassword2(!showPassword2)} // Toggle show/hide confirm password
          >
            {showPassword2 ? <FiEyeOff /> : <FiEye />} {/* Show/hide icon */}
          </span>
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
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <FaSpinner className="spinner" />
          ) : (
            'Sign Up'
          )}
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
