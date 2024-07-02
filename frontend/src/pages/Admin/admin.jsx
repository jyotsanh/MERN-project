
import { NavLink } from 'react-router-dom';
import './admin.css'; 

function Admin() {
    return (
        <>
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
                <button  className="admin-button">See the Appointments</button>
                </NavLink>
            </div>
        </div>
        </>
    );
}

export default Admin;
