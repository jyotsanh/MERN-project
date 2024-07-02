import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import searchIcon from '../assets/Search.png';
import wishlistIcon from '../assets/wish.png';
import accountIcon from '../assets/Account.png'; // Correct the image name if there's a typo
import cartIcon from '../assets/Cart.png';
// import { HiOutlineShoppingCart } from "react-icons/hi";

function Navbar() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="search-bar">
        <img src={searchIcon} alt="Search Icon" />
          {/* <i className="fas fa-search"></i> */}
          <input type="text" placeholder="What are you searching for?" />
        </div>

        <div className="actions">
  <div className="action">
    <NavLink to="/Login">
      <img src={accountIcon} alt="Account Icon" />
      <span className='action'>Account</span>
    </NavLink>
  </div>
  <div className="action">
    <img src={cartIcon} alt="Cart Icon" />
    <span>Cart</span>
  </div>
</div>

      </nav>

      <ul className="menu">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/sunglasses" activeClassName="active">Sunglasses</NavLink></li>
        {/* <li><NavLink to="/eyeglasses" activeClassName="active">Eyeglasses</NavLink></li> */}
        <li><NavLink to="/contactlens" activeClassName="active">Lens</NavLink></li>
        <li><NavLink to="/book" activeClassName="active">Book Appointment</NavLink></li>
        <li><NavLink to="/faq" activeClassName="active">FAQs</NavLink></li>
        <li><NavLink to="/admin-login" activeClassName="active">Admin</NavLink></li>
      </ul>

      {showLoginForm && (
        <div className="modal">
          <div className="modal-content">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
