import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import logo from '../assets/logo.png';
import searchIcon from '../assets/Search.png';
import wishlistIcon from '../assets/wish.png';
import accountIcon from '../assets/Account.png'; // Correct the image name if there's a typo
import cartIcon from '../assets/Cart.png';
// import { HiOutlineShoppingCart } from "react-icons/hi";

function Navbar() {
  
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [username,setUsername] = useState("");
  useEffect(() => {
    const token = Cookies.get('token'); // replace 'jwt' with the name of your JWT cookie
    setJwt(token);
    if(token){
      try {
          const decoded = jwtDecode(token);
          console.log(decoded) // REMOVE THIS LINE WHEN DEPLOYING
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
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const LoggingOut = () => {
    Cookies.remove('token');
    window.location.reload();
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
            {jwt ? (  <>
                      <div className="action">
                        <NavLink to="/Profile">
                          <img src={accountIcon} alt="Account Icon" />
                          <span className='action'>{username}</span>
                        </NavLink>
                      </div>

                      
                      <div className="action">
                        <img src={cartIcon} alt="Cart Icon" />
                        <button onClick={LoggingOut}><span>Log out</span></button>
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
