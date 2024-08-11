import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { FetchProductWithId } from '../service/api';
import { addToCart as apiAddToCart } from '../service/api';
import { useCart } from '../context/CartContext';
import Cookies from 'js-cookie';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await FetchProductWithId(id);
        const { Product } = response;
        setProduct(Product);
        if (Product.imageUrls && Product.imageUrls.length > 0) {
          setSelectedImage(`/${Product.imageUrls[0]}`);
        }
      } catch (error) {
        setError('Error fetching product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (product) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const payload = {
        items: [
          {
            productId: product._id,
            price: product.price
          }
        ]
      };
     
      await apiAddToCart(payload, token);
      dispatch({ type: 'ADD_TO_CART', payload: product });
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === 'userId doesnt exist') {
          setError('User does not exist.');
        } else if (error.response.status === 403) {
          setError('Authorization error. Please check your credentials.');
        } else {
          setError('An error occurred while adding to cart. Please try again later.');
        }
      } else if (error.request) {
        setError('No response received from server.');
      } else {
        setError('Error setting up request.');
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(`/${imageUrl}`);
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
              src={`/${imageUrl}`}
              alt={product.name}
              className={`pro-thumbnail ${selectedImage === `/${imageUrl}` ? 'pro-selected' : ''}`}
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
          <select className="pro-quantity-selector">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
            <option value="1">4</option>
            <option value="1">5</option>
            <option value="1">6</option>
            <option value="1">7</option>
            <option value="1">8</option>
            <option value="1">9</option>
            <option value="1">10</option>
            {/* Add more options as needed */}
          </select>
          <button onClick={() => addToCart(product)} className="pro-add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
