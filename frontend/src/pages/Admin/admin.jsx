import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import './admin.css'; 
import { jwtDecode } from "jwt-decode";;

function Admin() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token); // remove when deploying to production
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
        return null; // Or a loading spinner if preferred
    }

    return (
        <div className="admin-layout">
            <nav className="admin-sidebar">
                <h2 className="sidebar-title">Admin Dashboard</h2>
                <NavLink to="/admin-view">
                     See Products
                </NavLink>
                 <NavLink to="/add-products">
                    Add Products
                </NavLink>
                
                <NavLink to="/appointments">
                    See Appointments
                </NavLink>
                <NavLink to="/orders">
                    Incoming Orders
                </NavLink>
            </nav>
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
