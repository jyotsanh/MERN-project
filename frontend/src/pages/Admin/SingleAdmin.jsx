import React, { useState } from 'react';
import './SingleAdmin.css';

// Placeholder components for each section
const UserManagement = () => (
  <div>
    <h2>User Management</h2>
    <button>Create User</button>
    <button>Delete User</button>
    <button>Update User</button>
  </div>
);

const ProductManagement = () => (
  <div>
    <h2>Product Management</h2>
    <button>Add new Product</button>
    <button>Update the Product</button>
    <button>See all the products</button>
  </div>
);

const AppointmentManagement = () => (
  <div>
    <h2>Appointment Management</h2>
    <button>See the Appointments</button>
  </div>
);

const OrderManagement = () => (
  <div>
    <h2>Order Management</h2>
    <button>Pending Orders</button>
    <button>Completed Orders</button>
  </div>
);

const SingleAdmin = () => {
  const [activeComponent, setActiveComponent] = useState('welcome');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'user':
        return <UserManagement />;
      case 'product':
        return <ProductManagement />;
      case 'appointment':
        return <AppointmentManagement />;
      case 'order':
        return <OrderManagement />;
      default:
        return <h1>Welcome Admin</h1>;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li onClick={() => setActiveComponent('user')}>User Management</li>
            <li onClick={() => setActiveComponent('product')}>Product Management</li>
            <li onClick={() => setActiveComponent('appointment')}>Appointment Management</li>
            <li onClick={() => setActiveComponent('order')}>Order Management</li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default SingleAdmin;
