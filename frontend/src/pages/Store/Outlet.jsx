import React from 'react';
import { Link } from 'react-router-dom';
import Store from "../../assets/Store.png";
import loc from '../../assets/Loc.png';
import i from '../../assets/1.jpg';
import im from '../../assets/2.jpg';
import img from '../../assets/3.jpg';
import "./Outlet.css";

function Outlet() {
  return (
    <>
      {/* Appointment Booking Section */}
      <div className="store-booking-section">
        <h2>Book an Appointment for Eye Checkup</h2>
        <p>Get your eyes checked by our professional optometrists. Fill out the form below to schedule your appointment.</p>
        <div className="store-carousel-container">
          <div className="store-carousel">
            <div className="store-carousel-images">
              <img src={i} alt="Glasses Model 1" className="store-carousel-image" />
              <img src={im} alt="Glasses Model 2" className="store-carousel-image" />
              <img src={img} alt="Contact Lens" className="store-carousel-image" />
            </div>
          </div>
          <button className="store-book-now-btn">
            <Link to="/book" className='while-700'>Book Now</Link>
          </button>
        </div>
      </div>

      {/* Outlet Section */}
      <div className="store-outlet-section">
        <div className="store-heading">
          <h1>Our Outlets</h1>
        </div>
        <div className="store-outlets ">
          <div className="store-outlet">
            <img src={Store} alt="Boudha Outlet" />
            <h2 className="store-loc">
              <img src={loc} alt="" className="store-loc1" />
              Boudha
            </h2>
            <p>Ground floor, Nabil Bank, Boudha, Kathmandu</p>
          </div>

          <div className="store-outlet">
            <img src={Store} alt="New Baneshor Outlet" />
            <h2 className="store-loc">
              <img src={loc} alt="" className="store-loc1" />
              New Baneshor
            </h2>
            <p>Ground floor, Nabil Bank, Boudha, Kathmandu</p>
          </div>

          <div className="store-outlet">
            <img src={Store} alt="Shankhamul Outlet" />
            <h2 className="store-loc">
              <img src={loc} alt="" className="store-loc1" />
              Shankhamul
            </h2>
            <p>Beside Nagararjun College</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Outlet;
