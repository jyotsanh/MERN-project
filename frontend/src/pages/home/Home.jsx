import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const NextArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <i className="fa-solid fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const multipleItemsSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="home">
      {/* Image Slider Section */}
      <section className="image-slider">
        <Slider {...settings}>
          <div className="slide"><img src="Silde1.png" alt="Slide 1" /></div>
          <div className="slide"><img src="Silde2.png" alt="Slide 2" /></div>
          <div className="slide"><img src="silde3.png" alt="Slide 3" /></div>
          <div className="slide"><img src="Silde4.png" alt="Slide 4" /></div>
        </Slider>
      </section>

      {/* Two-Image Section */}
      <section className="two-image-section">
        <h2>Elevate Your Look with Our Signature Features</h2>
        <div className="image-description">
          <div className="image-text">
            <img src="View1.png" alt="Image 1" className="eyeglasses" />
            <div className="description1">
              <h3>Ultra-lightweight Frames <br />for Maximum Comfort</h3>
              <Link to="/Sunglasses"><button>View More</button></Link>
            </div>
          </div>
          <div className="image-text">
            <img src="view2.png" alt="Image 2" className="polarized-glasses" />
            <div className="description">
              <h3>Trendy Designs with UV Protection</h3>
              <Link to="/Sunglasses"><button>View More</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trending Products Section */}
      <section className="top-trending-products">
        <h2>Top Trending Products</h2>
        <Slider {...multipleItemsSettings}>
          <div className="product">
            <Link to="/Sunglasses">
              <img src="p1.png" alt="Product 1" />
              <p>Product 1</p>
            </Link>
            <p className="price">Rs 500</p>
          </div>
          <div className="product">
            <Link to="/Eyeglasses">
              <img src="p2.png" alt="Product 2" />
              <p className='Prod'>Product 2</p>
            </Link>
            <p className="price">Rs 500</p>
          </div>
          <div className="product">
            <Link to="/Contactlens">
              <img src="P3.png" alt="Product 3" />
              <p>Product 3</p>
            </Link>
            <p className="price">Rs 500</p>
          </div>
          <div className="product">
            <Link to="/Sunglasses">
              <img src="p4.png" alt="Product 4" />
              <p>Product 4</p>
            </Link>
            <p className="price">Rs 500</p>
          </div>
        </Slider>
      </section>

      {/* Location Section */}
      <section className="address">
        <h1>Store Location</h1>
      <div className="location">
      <img></img>
              <p>Address:Bouddha<br/> 
                Contact No:01-4325678<br/>
                7am-7pm
              </p>
            
       </div>
        
      </section>
    </div>
  );
};

export default Home;
