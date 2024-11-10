import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { FetchKidsglassesProductWithId, getCartItems, addToCart as apiAddToCart } from './../../../service/api';
import { useCart } from './../../../context/CartContext';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Define the ProductSlider component here
const ProductSlider = ({ suggestedProducts, onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < suggestedProducts.length - 4) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="pro-suggested-products">
      <h3>You may also like</h3>
      <div className="pro-suggested-slider">
        <button className="slider-button slider-button-left" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="pro-suggested-grid" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
          {suggestedProducts.map((suggestedProduct) => (
            <div
              key={suggestedProduct._id}
              className="pro-suggested-item"
              onClick={() => onProductClick(suggestedProduct._id)} // Call the onProductClick prop
            >
              <img
                src={suggestedProduct.imageUrls[0]}
                alt={suggestedProduct.name}
                className="pro-suggested-image"
              />
              <p>{suggestedProduct.name}</p>
              <p>Rs. {suggestedProduct.price}</p>
            </div>
          ))}
        </div>
        <button className="slider-button slider-button-right" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};


function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
}

function checkIsAdmin(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin';
  } catch (error) {
    return false;
  }
}

const KidsGlassesProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(null);
  const navigate = useNavigate();
  const handleProductClick = (productId) => {
    navigate(`/kidsglasses/${productId}`);
  };

  const calculateOriginalPrice = (price) => {
    const increments = [200, 300, 450, 120, 100, 310];
    const randomIncrement = increments[Math.floor(Math.random() * increments.length)];
    return price + randomIncrement;
  };

  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const fetchProductAndCartItems = async () => {
      try {
        const token = Cookies.get('token');
        const response = await FetchKidsglassesProductWithId(id);
        const { Product, youMayAlsoLike } = response;
        setProduct(Product);
        setSuggestedProducts(youMayAlsoLike);
        setOriginalPrice(calculateOriginalPrice(Product.price));

        if (Product.imageUrls && Product.imageUrls.length > 0) {
          setSelectedImage(`${Product.imageUrls[0]}`);
        }

        if (token) {
          if (isTokenExpired(token)) {
            navigate('/Login');
            return;
          } else {
            if (checkIsAdmin(token)) {
              setIsAdminUser(true);
              return;
            }
            const cartResponse = await getCartItems(token);
            if (cartResponse && cartResponse.Cart) {
              const { Cart } = cartResponse;
              if (Cart.items && Array.isArray(Cart.items) && Cart.items.length > 0) {
                const productInCart = Cart.items.some(item => item.productId === id);
                setIsInCart(productInCart);
              } else {
                setIsInCart(false);
              }
            } else {
              setIsInCart(false);
            }
          }
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching product. Please try again later.');
      }
    };

    fetchProductAndCartItems();
  }, [id, navigate]);

  const addToCart = async () => {
    try {
      const token = Cookies.get('token');
      if (!token || isTokenExpired(token)) {
        setError("Please login to add to cart");
        navigate('/Login');
        return;
      }

      const payload = {
        items: [{
          productId: product._id,
          price: product.price,
          imageUrl: product.imageUrls[0],
          name: product.name
        }]
      };

      await apiAddToCart(payload, token);
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setIsInCart(true);
    } catch (error) {
      setError(error.response?.data?.message ||
        'An error occurred while adding to cart.');
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(`${imageUrl}`);
  };

  if (error) {
    return <div className="pro-error-message">{error}</div>;
  }

  if (!product) {
    return <div className="pro-loading">Loading...</div>;
  }

  // Join the category array with commas
  const formattedCategory = product.category.join(', ');
  return (
    <div className="pro-product-page">
      <div className="pro-product-image-container">
        <img src={selectedImage} alt={product.name} className="pro-product-image" />
        <div className="pro-thumbnail-container">
          {product.imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={product.name}
              className={`pro-thumbnail ${selectedImage === imageUrl ? 'pro-selected' : ''}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </div>
      </div>

      <div className="pro-product-details">
        <h2 className="pro-product-name">{product.name}</h2>
        <div className="pro-product-price">
          <strong>Price:</strong>
          <span className="pro-original-price">Rs. {originalPrice}</span>
          <span className="pro-discounted-price">Rs. {product.price}</span>
        </div>
        <p className="pro-product-frame"><strong>Frame Material:</strong> {product.frame_material}</p>
        <p className="pro-product-lens"><strong>Lens Material:</strong> {product.lens_material}</p>
        <p className="pro-product-shape"><strong>Frame Shape:</strong> {product.frame_shape}</p>
        <p className="pro-product-description"><strong>Description:</strong> {product.description}</p>
        <p className="pro-product-category"><strong>Category:</strong> {formattedCategory}</p>
        <div className="pro-cart-actions">
          {isAdminUser ? (
            <p className="pro-admin-message">Admin is not allowed to add to cart</p>
          ) : (
            <button
              onClick={addToCart}
              className={`pro-add-to-cart-button ${isInCart ? 'added' : ''}`}
              disabled={isInCart}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>

      {/* Suggested Products Section */}
      <ProductSlider suggestedProducts={suggestedProducts} onProductClick={handleProductClick} />


      {/* Notification component */}
      {showNotification && (
        <div className="pro-notification">
          <div className="pro-notification-content">
            <span className="pro-notification-icon">&#10004;</span>
            Product added successfully!
          </div>
        </div>
      )}
      
    </div>
  );
};

export default KidsGlassesProductPage;
