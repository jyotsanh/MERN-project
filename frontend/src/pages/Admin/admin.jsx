import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { NavLink , useNavigate} from 'react-router-dom';
import './admin.css'; 
import { jwtDecode } from "jwt-decode";


function Admin() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token) // remove when deploying to production
        if (!token) {
            navigate('/');
        } else {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/');
            }
        
        }
    }, [navigate]);

    if (!isAdmin) {
        return (
            <>
            </>
        );
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin</h1>
            <div className="admin-buttons">
                <NavLink to="/add-products">
                    <button className="admin-button">Add Products</button>
                </NavLink>
                <NavLink to="/admin-view">
                    <button className="admin-button">See the Products</button>
                </NavLink>
                <NavLink to="/appointments">
                    <button className="admin-button">See the Appointments</button>
                </NavLink>
            </div>
        </div>
    );

}

export default Admin;
