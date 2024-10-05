import React, { useState,useEffect } from 'react';
import { AdminLogin } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './loginAdmin.css';
import {jwtDecode} from 'jwt-decode';

function isTokenExpired(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If there's an error decoding, assume the token is invalid
    }
  }

function AdminLogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const [error, setError] = useState({});


    useEffect(() => {
        const token = Cookies.get('token');
        if(!token){
            return;
        }else if(isTokenExpired(token)){
            return;
        }else{
            try{
            const decoded = jwtDecode(token);
            if(decoded.role === 'admin'){
                navigate('/admin');
            }else{
                return;
            }
        }catch(error){
            console.error('Invalid token:', error);
            navigate('/admin-login');
        }
        }
        
    }, [navigate]);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        // Basic validation
        if (!email || !password) {
            setError({ "msg": 'Please enter both email and password' });
            return;
        }

        try {
            const response = await AdminLogin({ email, password });
            if (response.token) {
                Cookies.set('token', response.token);
                navigate('/admin');
            }
        } catch (error) {
            setError({ msg: error.response?.data?.msg || 'Login failed' });
        }
    };

    return (
        <div className="admin-login-container">
            <h1 className="admin-login-title">Admin LogIn</h1>
            <form onSubmit={handleSubmit} className="admin-login-form">
                <div className="admin-input-container">
                    <label htmlFor="email">Email:</label>
                    <div className="admin-input-wrapper">
                        <i className="fas fa-envelope admin-input-icon"></i>
                        <input
                            type="email"
                            id="email"
                            className="admin" // Added 'admin' class
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="admin-input-container">
                    <label htmlFor="password">Password:</label>
                    <div className="admin-input-wrapper">
                        <i className="fas fa-lock admin-input-icon"></i>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="admin" // Added 'admin' class
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} admin-password-icon`}
                            onClick={handlePasswordVisibility}
                        ></i>
                    </div>
                </div>
                {error.msg && <p className="admin-error-msg">{error.msg}</p>}
                <button type="submit" className="admin-login-button">Log In</button>
            </form>
        </div>
    );
}

export default AdminLogIn;
