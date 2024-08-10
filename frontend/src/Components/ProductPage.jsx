import React, { useState, useEffect, useContext } from 'react';
import './ProductPage.css';
import { useParams } from 'react-router-dom';
import { FetchProductWithId } from '../service/api';
import { addToCart as apiAddToCart } from '../service/api'; // Import your addToCart API
import { useCart } from '../context/CartContext';
import Cookies from 'js-cookie'; // Import js-cookie
import { AuthContext } from '../pages/auth/AuthContext'; // Import AuthContext

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(id)
        const response = await FetchProductWithId(id);
        
        const { Product } = response;
        setProduct(Product);
        console.log(`Products  :${Product}`)
        if (Product.imageUrls && Product.imageUrls.length > 0) {
          setSelectedImage(`/${Product.imageUrls[0]}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (product) => {
    try {
      console.log(`small product : ${product.price}`)
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
      console.log(`payload :${payload}`)
     
      await apiAddToCart(payload, token); // Pass both the payload and token to the API
      dispatch({ type: 'ADD_TO_CART', payload: product });
    } catch (error) {
      console.error('Error adding to cart:', error);

      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);

        if (error.response.data.message === 'userId doesnt exist') {
          setError('User does not exist.');
        } else if (error.response.status === 403) {
          setError('Authorization error. Please check your credentials.');
        } else {
          setError('An error occurred while adding to cart. Please try again later.');
        }
      } else if (error.request) {
        setError('No response received from server.');
        console.error('Error request:', error.request);
      } else {
        setError('Error setting up request.');
        console.error('Error message:', error.message);
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(`/${imageUrl}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>; // Display error message if there is an error
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src={selectedImage} alt={product.name} className="product-image" />
        <div className="thumbnail-container">
          {product.imageUrls && product.imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={`/${imageUrl}`}
              alt={product.name}
              className={`thumbnail ${selectedImage === `/${imageUrl}` ? 'selected' : ''}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price"><strong>Price:</strong> Rs.{product.price}</p>
        <p className='product-frame'><strong>Frame Material:</strong> {product.frame_material}</p>
        <p className='product-lens'><strong>Lens Material:</strong> {product.lens_material}</p>
        <p className='product-shape'><strong>Frame Shape:</strong> {product.frame_shape}</p>
        <p className="product-description"><strong>Description:</strong> {product.description}</p>
        <p className="product-category"><strong>Category:</strong> {product.category}</p>
        <button onClick={() => addToCart(product)} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
