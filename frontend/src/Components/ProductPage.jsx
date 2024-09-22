import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { FetchProductWithId,getCartItems, addToCart as apiAddToCart } from '../service/api';
import { useCart } from '../context/CartContext';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // If there's an error decoding, assume the token is invalid
  }
}

function isAdmin(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin';
  } catch (error) {
    return false; // If there's an error decoding, assume the token is invalid
  }
}
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // Notification state
  const [addedToCart, setAddedToCart] = useState(false); // New state for the "Added" button text
  const navigate = useNavigate();
  const [isAAdmin, setIsAAdmin] = useState(false);

    // New state for the original price
    const [originalPrice, setOriginalPrice] = useState(null);
  // Function to calculate a random higher price
  const calculateOriginalPrice = (price) => {
    const increments = [200, 300, 450, 120,100,310];
    const randomIncrement = increments[Math.floor(Math.random() * increments.length)];
    return price + randomIncrement;
  };


  useEffect(() => {
    const fetchProductAndCartItems = async () => {
      try {
        const token = Cookies.get('token');
        const response = await FetchProductWithId(id);
        const { Product } = response;
        setProduct(Product);
        // Calculate and set the original price
        setOriginalPrice(calculateOriginalPrice(Product.price));

        if (Product.imageUrls && Product.imageUrls.length > 0) {
          setSelectedImage(`${Product.imageUrls[0]}`);
        }
        if(token) {
          if(isTokenExpired(token)) {
            navigate('/Login');
            return;
          }else{
            if(isAdmin(token)) {
              setIsAAdmin(true);
              return
            }
            const cartResponse = await getCartItems(token);
            const { Cart } = cartResponse;
            const { items } = Cart;
    
    
            const productInCart = items.some(item => item.productId === id);
            setIsInCart(productInCart);
          }

        
        }

      } catch (error) {
        console.log(error)
        setError('Error fetching product. Please try again later.');
      }


    };
    
    fetchProductAndCartItems();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = Cookies.get('token');
      if (!token || isTokenExpired(token)) {
        setError("Please login to add to cart");
        navigate('/Login');
        return;
      }

      const payload = {
        items: [
          {
            productId: product._id,
            price: product.price,
            imageUrl: product.imageUrls[0],
            name: product.name
          }
        ]
      };

      await apiAddToCart(payload, token);
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setShowNotification(true); // Show notification on success
      // setAddedToCart(true); // Update button text to "Added"
      setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
      setIsInCart(true)
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while adding to cart. Please try again later.');
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

  return (
    <div className="pro-product-page">
      <div className="pro-product-image-container">
        <img src={selectedImage} alt={product.name} className="pro-product-image" />
        <div className="pro-thumbnail-container">
          {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={`${imageUrl}`}
              alt={product.name}
              className={`pro-thumbnail ${selectedImage === `${imageUrl}` ? 'pro-selected' : ''}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </div>
      </div>
      <div className="pro-product-details">
        <h2 className="pro-product-name"> {product.name}</h2>
        <div className="pro-product-price">
          <strong>Price:</strong><span className="pro-original-price">Rs. {originalPrice}</span>
          <span className="pro-discounted-price">Rs. {product.price}</span>
        </div>
        <p className="pro-product-frame"><strong>Frame Material:</strong> {product.frame_material}</p>
        <p className="pro-product-lens"><strong>Lens Material:</strong> {product.lens_material}</p>
        <p className="pro-product-shape"><strong>Frame Shape:</strong> {product.frame_shape}</p>
        <p className="pro-product-description"><strong>Description:</strong> {product.description}</p>
        <p className="pro-product-category"><strong>Category:</strong> {product.category}</p>
        <div className="pro-cart-actions">
          <p className="pro-product-status"><strong>Status:</strong> In Stock</p>
          
          {!isAAdmin ? (
            <button 
              onClick={addToCart} 
              className={`pro-add-to-cart-button ${isInCart ? 'added' : ''}`} 
              disabled={isInCart}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          ) : (
            <div>
                <p className="pro-product-status"><strong>Admin is not allowed to add to cart</strong></p>
            </div>
            
          )}
        </div>

      </div>

      {/* Notification component */}
      {showNotification && (
        <div className="pro-notification">
          <div className="pro-notification-content">
            <span className="pro-notification-icon">&#10004;</span> {/* Tick mark */}
            Product added successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
