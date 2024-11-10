import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../pages/auth/AuthContext'; // Import AuthContext
import { jwtDecode } from "jwt-decode";
import logo from '../assets/logo.png';
import searchIcon from '../assets/Search.png';
import accountIcon from '../assets/Account.png';
import cartIcon from '../assets/Cart.png';
import Logout from '../assets/logout.webp';
import { FiMenu, FiX } from 'react-icons/fi';

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // If there's an error decoding, assume the token is invalid
  }
}

function Navbar() {
  const { token, logout } = useContext(AuthContext); // Use AuthContext
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    if (token) {
      if (isTokenExpired(token)) {
        logout(); // Automatically logout if token is expired
        setUsername("No name");
      } else {
        try {
          const decoded = jwtDecode(token);
          setUsername(decoded.username || "No name");
        } catch (error) {
          console.error('Invalid token:', error);
          logout();
        }
      }
    } else {
      setUsername("No name");
    }
    console.log("Navbar Component Mounted");
  }, [token, logout]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const LoggingOut = () => {
    Cookies.remove('token');
    setJwt("")
    window.location.reload();
  }
    const CartIcon = () => {
      const { cart } = useCart();
    
      const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    };
  return (
    <div className="navbar mt-3">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" />
          <input type="text" placeholder="What are you searching for?" />
        </div>

        <div className="actions">
          {token ? (
            <>
              <div className="action">
                <NavLink to="/Profile">
                  <img src={accountIcon} alt="Account Icon" />
                  <span className='action'>{username}</span>
                </NavLink>
              </div>
              <div className="action">
              <button
            onClick={async () => {
              await logout(); // Wait for logout to complete
              setUsername(""); // Clear username on logout
              navigate("/"); // Navigate to the home page
            }}
            
            style={{
              backgroundColor: 'white',
              border: 'none',
              height: '20px',
              width: '130px',
              marginTop: '20px',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          
          >   <NavLink to="/" className='action'>
            <img src={Logout} alt="Logout Icon" />
            <span>Log out</span>
            </NavLink>
</button>
              </div>
            </>
          ) : (
            <div className="action">
              <NavLink to="/Login">
                <img src={accountIcon} alt="Account Icon" />
                <span className='action'>Sign-In</span>
              </NavLink>
            </div>
          )}

          <div className="action">
            <NavLink to="/cart">
              <img src={cartIcon} alt="Cart Icon" />
              <span className='action'>Cart</span>
            </NavLink>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FiX className="hamburger-icon" /> : <FiMenu className="hamburger-icon" />}
        </div>
      </nav>

      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/sunglasses" className={({ isActive }) => isActive ? 'active' : ''}>Sunglasses</NavLink></li>
        <li><NavLink to="/contactlens" className={({ isActive }) => isActive ? 'active' : ''}>Contact Lens</NavLink></li>
        <li><NavLink to="/eyeglasses" className={({ isActive }) => isActive ? 'active' : ''}>EyeGlasses</NavLink></li>
        <li><NavLink to="/kidsglasses" className={({ isActive }) => isActive ? 'active' : ''}>Kids Glasses</NavLink></li>
        <li><NavLink to="/book" className={({ isActive }) => isActive ? 'active' : ''}>Book Appointment</NavLink></li>
        <li><NavLink to="/store-locator" className={({ isActive }) => isActive ? 'active' : ''}>Store Locator</NavLink></li>
        <li><NavLink to="/myorders" className={({ isActive }) => isActive ? 'active' : ''}>My Orders</NavLink></li>
        
      </ul>
    </div>
  );
}

export default Navbar;


