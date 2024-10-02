import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart } from 'react-icons/ai';
import { useCart } from '../../context/CartContext';
import Outlet from '../../pages/Store/Outlet.jsx'; 

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
// Adjust the slider settings to handle responsiveness
const multipleItemsSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Shows 4 items on larger screens
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3, // Shows 3 items on medium screens
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2, // Shows 2 items on tablets
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1, // Shows 1 item on mobile
        slidesToScroll: 1,
      },
    },
  ],
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
      <section className="image-slider max-w-full overflow-hidden">
  <Slider {...settings}>
    <div className="slide">
      <img
        src="/webp/lakpachoice1.webp"
        alt="Slide 1"
        className="w-full h-60 sm:h-80 md:h-96 object-cover"
      />
    </div>
    <div className="slide">
      <img
        src="/webp/lakpachoice2.webp"
        alt="Slide 2"
        className="w-full h-60 sm:h-80 md:h-96 object-cover"
      />
    </div>
    <div className="slide">
      <img
        src="/webp/lakpachoice3.webp"
        alt="Slide 3"
        className="w-full h-60 sm:h-80 md:h-96 object-cover"
      />
    </div>
    <div className="slide">
      <img
        src="/webp/img5.webp"
        alt="Slide 4"
        className="w-full h-60 sm:h-80 md:h-96 object-cover"
      />
    </div>
  </Slider>
</section>


<section className="two-image-section py-8 px-4 md:px-12 bg-gray-50">
  <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">
    Elevate Your Look with Our Signature Features
  </h2>
  <div className="image-description grid grid-cols-1 md:grid-cols-2 ">
    {/* First Image Block */}
    <div className="image-text flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 md:w-1/4 h-64">
      <img
        src="/webp/img5.webp"
        alt="Ultra-lightweight Frames"
        className="eyeglasses w-full md:w-1/4 h-64 object-cover"
      />
      <div className="description1 flex-1 p-4 text-center md:text-center md:ml-7">
        <h3 className="text-lg font-medium text-gray-700 md:text-center md:ml-7  md:w-10">
          Ultra-lightweight Frames <br /> for Maximum Comfort
        </h3>
        <Link to="/Sunglasses">
          <button className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-lg hover:from-orange-500 hover:to-blue-600 transition-colors duration-200">
            View More
          </button>
        </Link>
      </div>
    </div>

    {/* Second Image Block */}
    <div className="image-text flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src="/webp/img1.webp"
        alt="Trendy Designs with UV Protection"
        className="polarized-glasses w-full md:w-1/2 h-64 object-cover"
      />
      <div className="description flex-1 p-4 text-center md:text-left">
        <h3 className="text-lg font-medium text-gray-700 md:p-1 ml-2">
          Trendy Designs with  <br />UV Protection
        </h3>
        <Link to="/Sunglasses">
          <button className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-400 to-blue-500 text-white rounded-lg hover:from-orange-500 hover:to-blue-600 transition-colors duration-200">
            View More
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* Top Trending Products Section */}
      <section className="top-trending-products py-8 px-4">
  <h3 className="text-lg font-medium text-center text-gray-800 mb-2">Top Products</h3>
  <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Top Trending Products</h2>
  <Slider {...multipleItemsSettings}>
    <div className="product bg-white shadow-md rounded-lg overflow-hidden">
      <div className="image-container relative group">
        <img src="/webp/p1.png" alt="Product 1" className="w-full h-auto" />
        <Link to="/ProductPage" className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="icon flex items-center justify-center p-2 bg-white rounded-full shadow-md">
            <Link to="/cart">
              <li onClick={() => handleAddToCart({ id: 1, name: 'Product 1', price: 500, image: 'p1.png' })}>
                <AiOutlineHeart className="text-red-500 text-xl" />
              </li>
            </Link>
          </div>
        </Link>
      </div>
      <p className="text-center mt-2">Product 1</p>
      <p className="price text-center text-gray-600">Rs 500</p>
    </div>

    {/* Repeat similar structure for other products */}
    {/* Product 2 */}
    <div className="product bg-white shadow-md rounded-lg overflow-hidden">
      <div className="image-container relative group">
        <img src="/webp/p2.png" alt="Product 2" className="w-full h-auto" />
        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="icon flex items-center justify-center p-2 bg-white rounded-full shadow-md">
            <Link to="/cart">
              <li onClick={() => handleAddToCart({ id: 2, name: 'Product 2', price: 500, image: 'p2.png' })}>
                <AiOutlineHeart className="text-red-500 text-xl" />
              </li>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center mt-2">Product 2</p>
      <p className="price text-center text-gray-600">Rs 500</p>
    </div>

    {/* Product 3 */}
    <div className="product bg-white shadow-md rounded-lg overflow-hidden">
      <div className="image-container relative group">
        <Link to="/Sunglasses">
          <img src="/webp/P3.png" alt="Product 3" className="w-full h-auto" />
        </Link>
        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="icon flex items-center justify-center p-2 bg-white rounded-full shadow-md">
            <Link to="/cart">
              <li onClick={() => handleAddToCart({ id: 3, name: 'Product 3', price: 500, image: 'P3.png' })}>
                <AiOutlineHeart className="text-red-500 text-xl" />
              </li>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center mt-2">Product 3</p>
      <p className="price text-center text-gray-600">Rs 500</p>
    </div>

    {/* Product 4 */}
    <div className="product bg-white shadow-md rounded-lg overflow-hidden">
      <div className="image-container relative group">
        <img src="/webp/p4.png" alt="Product 4" className="w-full h-auto" />
        <Link to="/ProductPage" className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="icon flex items-center justify-center p-2 bg-white rounded-full shadow-md">
            <Link to="/cart">
              <li onClick={() => handleAddToCart({ id: 4, name: 'Product 4', price: 500, image: 'p4.png' })}>
                <AiOutlineHeart className="text-red-500 text-xl" />
              </li>
            </Link>
          </div>
        </Link>
      </div>
      <p className="text-center mt-2">Product 4</p>
      <p className="price text-center text-gray-600">Rs 500</p>
    </div>
  </Slider>
</section>
<Outlet />
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
