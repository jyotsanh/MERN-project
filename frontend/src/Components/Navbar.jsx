import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import logo from '../assets/logo.png';
import searchIcon from '../assets/Search.png';
import accountIcon from '../assets/Account.png';
import cartIcon from '../assets/Cart.png';
import Logout from '../assets/logout.webp';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = Cookies.get('token'); // replace 'jwt' with the name of your JWT cookie

    if (token) {
      setJwt(token);
      try {
        const decoded = jwtDecode(token);
       
        if (decoded.username) {
          setUsername(decoded.username);
        } else {
          setUsername("No name");
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/');
      }
    }
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const LoggingOut = () => {
    Cookies.remove('token');
    setJwt("")
    window.location.reload();
  }
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    const CartIcon = () => {
      const { cart } = useCart();
    
      const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
      <div className="navbar mt-3">
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
            {jwt ? (<>
              <div className="action">
                <NavLink to="/Profile">
                  <img src={accountIcon} alt="Account Icon" />
                  <span className='action'>{username}</span>
                </NavLink>
              </div>


              <div className="action">
 
  <button 
    onClick={LoggingOut} 
    style={{ backgroundColor: 'white', border: 'none', height: '20px', width: '130px', marginTop: '20px',padding: '0', display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}} // Correct inline style syntax
  >
     <img src={Logout} alt="Logout Icon" />
    <span>Log out</span>
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
            )
            }

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
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/sunglasses" activeClassName="active">Sunglasses</NavLink></li>
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
