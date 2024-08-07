import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useCart } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import { FetchProductWithId } from '../service/api';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
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
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(`/${imageUrl}`);
  };

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
        <Link to="/cart">
          <button onClick={() => addToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;
