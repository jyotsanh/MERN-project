import React, { useState } from 'react';
import { AdminLogin } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './adminlogin.css';

function AdminLogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        // Basic validation
        if (!email || !password) {
            setError({ "msg": 'Please enter both email and password' });
            return;
        }

        // Example of submitting the login request
        try {
            const response = await AdminLogin({ email, password });
            if (response.token) {
                // Set token in cookies
                Cookies.set('token', response.token);
                // Redirect or update UI
                console.log('Logged in successfully');
                navigate('/admin');
            }
        } catch (error) {
            setError({ msg: error.response?.data?.msg || 'Login failed' });
        }
    };

    return (
        <div className="admin-login-container">
            <h1 className="admin-login-title">Admin Login</h1>
            <form onSubmit={handleSubmit} className="admin-login-form">
                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <div className="input-wrapper">
                        <i className="fas fa-envelope input-icon"></i>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <div className="input-wrapper">
                        <i className="fas fa-lock input-icon"></i>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {error.msg && <p className="error-msg">{error.msg}</p>}
                <button type="submit" className="admin-login-button">Log In</button>
            </form>
        </div>
    );
}

export default AdminLogIn;
