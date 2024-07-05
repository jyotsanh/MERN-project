import React, { useState } from 'react';
import { AdminLogin } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
            setError({"msg":'Please enter both email and password'});
            return;
        }

        // Example of submitting the login request
        try {
            console.log( email, password)
            const response = await AdminLogin({ email, password });
            console.log(response.token);
            try{
                if (response.token) {
                    // Set token in cookies
                    Cookies.set('token', response.token);
                    // Redirect or update UI
                    console.log('Logged in successfully');
                }
            }catch(error){
                setError({"msg":"Cookiee Error occureed"}) // Remove development code
            }
            setError({});
            navigate('/admin');
        } catch (error) {
            console.log(error.response);
            const {email, password} = error.response
            setError({ email: email, password: password,msg: error.response.data.msg });
        }
    };

    return (
        <>
            <h1>Admin LogIn</h1> 
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error.msg && <p style={{ color: 'red' }}>{error.msg}</p>}
                <button type="submit">Log In</button>
            </form>    
        </>
    );
}   

export default AdminLogIn;
