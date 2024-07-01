import { NavLink } from 'react-router-dom';


function Admin(){
    return (
        <>
            <h1>Admin</h1>
            <br />
            <NavLink to="/add-products">
                <button href="/add-products">Add Products</button>
            </NavLink>
            
            <br />
            <br />
            <NavLink to="/admin-view">
                <button href="/admin-view">See the Products</button>
            </NavLink>
            <br />
            <br />
            <NavLink to="/appointments">
                <button >See the Appointments</button>
            </NavLink>
            
        </>
    );
}

export default Admin;