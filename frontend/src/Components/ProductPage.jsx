import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { FetchProductWithId, addToCart as apiAddToCart } from '../service/api';
import { useCart } from '../context/CartContext';
import Cookies from 'js-cookie';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useCart();
  const [showNotification, setShowNotification] = useState(false); // Notification state
  const [addedToCart, setAddedToCart] = useState(false); // New state for the "Added" button text

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await FetchProductWithId(id);
        const { Product } = response;
        setProduct(Product);
        if (Product.imageUrls && Product.imageUrls.length > 0) {
          setSelectedImage(`${Product.imageUrls[0]}`);
        }
      } catch (error) {
        setError('Error fetching product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setError("Please login to add to cart");
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
      setAddedToCart(true); // Update button text to "Added"
      setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
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
        <h2 className="pro-product-name">{product.name}</h2>
        <p className="pro-product-price"><strong>Price:</strong> Rs.{product.price}</p>
        <p className="pro-product-frame"><strong>Frame Material:</strong> {product.frame_material}</p>
        <p className="pro-product-lens"><strong>Lens Material:</strong> {product.lens_material}</p>
        <p className="pro-product-shape"><strong>Frame Shape:</strong> {product.frame_shape}</p>
        <p className="pro-product-description"><strong>Description:</strong> {product.description}</p>
        <p className="pro-product-category"><strong>Category:</strong> {product.category}</p>
        <div className="pro-cart-actions">
          <p className="pro-product-status"><strong>Status:</strong> In Stock</p>
          <button onClick={addToCart} className={`pro-add-to-cart-button ${addedToCart ? 'added' : ''}`}>
            {addedToCart ? 'Added' : 'Add to Cart'}
          </button>
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
