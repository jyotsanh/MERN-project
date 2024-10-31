import React, { useState } from 'react';

// Importing components
import Sidebar from './SideBarCompo';
import Dashboard from './DashboardCompo';
import AddProducts from '../../add-products/products';
import AllOrders from '../../AllOrders/AllOrders';
// import SeeTheProduct from './SeeTheProduct';
// import SeeTheAppointments from './SeeTheAppointments';
// import IncomingOrders from './IncomingOrders';
// Placeholder components for each sectio

const SingleAdmin = () => {
  // State to track which component is active
  const [activeComponent, setActiveComponent] = useState("");
  // Function to handle sidebar button clicks
  const handleSidebarClick = (componentName) => {
    console.log("Sidebar button clicked:", componentName);
    setActiveComponent(componentName);
  };
  return (
    <div className="flex">
      <Sidebar onSidebarClick={handleSidebarClick} />
      <div className="flex-1 p-4">
        {/* Conditional rendering based on the active component */}
        {activeComponent === "Orders" && <AllOrders />}
        {activeComponent === "Dashboard" && <Dashboard />}
        {activeComponent === "CreateProduct" && <AddProducts />}
      </div>
    </div>
  );
};

export default SingleAdmin;
