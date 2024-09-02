import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart } from 'react-icons/ai';
import { useCart } from '../../context/CartContext';

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
  const { dispatch } = useCart();

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

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="home">
      {/* Image Slider Section */}
      <section className="image-slider">
        <Slider {...settings}>
          <div className="slide">
            <img src="/webp/lakpachoice1.webp" alt="Slide 1" />
          </div>
          <div className="slide">
            <img src="/webp/lakpachoice2.webp" alt="Slide 2" />
          </div>
          <div className="slide">
            <img src="/webp/lakpachoice3.webp" alt="Slide 3" />
          </div>
          <div className="slide">
            <img src="/webp/img5.webp" alt="Slide 4" />
          </div>
        </Slider>
      </section>

      {/* Two-Image Section */}
      <section className="two-image-section">
        <h2>Elevate Your Look with Our Signature Features</h2>
        <div className="image-description">
          <div className="image-text">
            <img src="/webp/img5.webp" alt="Image 1" className="eyeglasses" />
            <div className="description1">
              <h3>Ultra-lightweight Frames <br />for Maximum Comfort</h3>
              <Link to="/Sunglasses">
                <button>View More</button>
              </Link>
            </div>
          </div>
          <div className="image-text">
            <img src="/webp/img1.webp" alt="Image 2" className="polarized-glasses" />
            <div className="description">
              <h3>Trendy Designs with UV Protection</h3>
              <Link to="/Sunglasses">
                <button>View More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trending Products Section */}
      <section className="top-trending-products">
        <h3>Top Products</h3>
        <h2>Top Trending Products</h2>
        <Slider {...multipleItemsSettings}>
          <div className="product">
            <div className="image-container">
              <img src="/webp/p1.png" alt="Product 1" />
              <Link to="/ProductPage">
                <div className="overlay">
                  <div className="icon">
                    <Link to="/cart">
                      <li onClick={() => handleAddToCart({ id: 1, name: 'Product 1', price: 500, image: 'p1.png' })}>
                        <AiOutlineHeart />
                      </li>
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          
            <p>Product 1</p>
            <p className="price">Rs 500</p>
           
          </div>

          <div className="product">
            <div className="image-container">
              <img src="/webp/p2.png" alt="Product 2" />
              <div className="overlay">
                <div className="icon">
                  <Link to="/cart">
                    <li onClick={() => handleAddToCart({ id: 2, name: 'Product 2', price: 500, image: 'p2.png' })}>
                      <AiOutlineHeart />
                    </li>
                  </Link>
                </div>
              </div>
            </div>
           
            <p>Product 2</p>
            <p className="price">Rs 500</p>
            
          </div>

          <div className="product">
            <div className="image-container">
              <Link to="/Sunglasses">
                <img src="/webp/P3.png" alt="Product 3" />
              </Link>
              <div className="overlay">
                <div className="icon">
                  <Link to="/cart">
                    <li onClick={() => handleAddToCart({ id: 3, name: 'Product 3', price: 500, image: 'P3.png' })}>
                      <AiOutlineHeart />
                    </li>
                  </Link>
                </div>
              </div>
            </div>
           
            <p>Product 3</p>
            <p className="price">Rs 500</p>
            
          </div>

          <div className="product">
            <div className="image-container">
              <img src="/webp/p4.png" alt="Product 4" />
              <Link to="/ProductPage">
                <div className="overlay">
                  <div className="icon">
                    <Link to="/cart">
                      <li onClick={() => handleAddToCart({ id: 4, name: 'Product 4', price: 500, image: 'p4.png' })}>
                        <AiOutlineHeart />
                      </li>
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
            <p>Product 4</p>
            <p className="price">Rs 500</p>
          </div>
        </Slider>
      </section>

      {/* Location Section */}
      {/* <section className="address">
        <h1>Store Location</h1>
        <div className="location">
          <img />
          <p>
            Address:Bouddha<br />
            Contact No:01-4325678<br />
            7am-7pm
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
