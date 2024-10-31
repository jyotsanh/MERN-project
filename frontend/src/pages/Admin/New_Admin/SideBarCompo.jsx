import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag, Users, Package, Grid, Ticket } from 'lucide-react';

const Sidebar = ({ onSidebarClick }) => {
  const [expandedMenus, setExpandedMenus] = useState({
    users: false,
    products: false,
    categories: false,
    coupons: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const MenuItem = ({ icon: Icon, label, expanded, onToggle, children, onClick }) => {
    const handleClick = (e) => {
      if (onClick) {
        onClick(e);
      }
      if (onToggle) {
        onToggle(e);
      }
    };

    return (
      <div className="mb-2">
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </div>
          {children && (
            expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expanded && children && (
          <div className="ml-12 mt-2 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SubMenuItem = ({ label, onClick }) => (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }} 
      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {label}
    </a>
  );

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 px-3 py-4">
      <MenuItem
        icon={ShoppingBag}
        label="Orders"
        onClick={() => onSidebarClick('Orders')}
      />
      
      <MenuItem
        icon={Users}
        label="User Management"
        expanded={expandedMenus.users}
        onToggle={() => toggleMenu('users')}
      >
        <SubMenuItem 
          label="Profile" 
          onClick={() => onSidebarClick('Dashboard')}
        />
        <SubMenuItem 
        label="Create User" 
        onClick={() => onSidebarClick('CreateUser')}
        />
        <SubMenuItem 
        label="Update User"
        onClick={() => onSidebarClick('UpdateUser')}
        />
        <SubMenuItem 
        label="Delete" 
        onClick={() => onSidebarClick('DeleteUser')}
        />
      </MenuItem>

      <MenuItem
        icon={Package}
        label="Product Management"
        expanded={expandedMenus.products}
        onToggle={() => toggleMenu('products')}
      >
        <SubMenuItem label="Create Product" onClick={() => onSidebarClick('CreateProduct')}/>
        <SubMenuItem label="Update Product" onClick={() => onSidebarClick('UpdateProduct')}/>
        <SubMenuItem label="Delete Product" onClick={() => onSidebarClick('DeleteProduct')}/>
      </MenuItem>

      <MenuItem
        icon={Grid}
        label="Category Management"
        expanded={expandedMenus.categories}
        onToggle={() => toggleMenu('categories')}
      >
        <SubMenuItem label="Create Category" onClick={() => onSidebarClick('CreateCategory')}/>
        <SubMenuItem label="Update Category" onClick={() => onSidebarClick('UpdateCategory')}/>
        <SubMenuItem label="Delete Category" onClick={() => onSidebarClick('DeleteCategory')}/>
      </MenuItem>

      <MenuItem
        icon={Ticket}
        label="Coupon Management"
        expanded={expandedMenus.coupons}
        onToggle={() => toggleMenu('coupons')}
      >
        <SubMenuItem label="Create Coupon" onClick={() => onSidebarClick('CreateCoupon')}/>
        <SubMenuItem label="Update Coupon" onClick={() => onSidebarClick('UpdateCoupon')}/>
      </MenuItem>
    </div>
  );
};

export default Sidebar;