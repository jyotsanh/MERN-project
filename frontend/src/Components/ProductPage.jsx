import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';
import { FetchProductWithId } from '../service/api';
import {Link } from 'react-router-dom';

const ProductPage = () => {

  const { id } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    // Fetch product details from your API
    const fetchProduct = async () => {
      try {
        const response = await FetchProductWithId(id);
        const {Product} = response
        setProduct(Product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  const addToCart = () => {
    const data = {
      userId:id,
      items: [
        {
          productId: id,
          quantity: 1
        }
      ]
    }
    console.log(data)
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-info">
      <img src={`../../public/${product.imageUrl}`} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className='product-frame'>Frame Material : {product.frame_material}</p>
      <p className='product-lens'>Lens Material : {product.lens_material}</p>
      <p className='product-shape'>Frame Shape : {product.frame_shape}</p>
      <p className="product-price">Price: Rs.{product.price}</p>
      <p className="product-description">Description: {product.description}</p>
      <p className="product-category">Category: {product.category}</p>
      <Link to={`/cart`}>
        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </Link>
      
    </div>
  );
}

export default ProductPage;