import React, { useState } from 'react';
import './ProductPage.css';
import { Link } from 'react-router-dom';
import{useCart}from'../context/CartContext';

const ProductPage = () => {
    const{dispatch}=useCart();

  const product = {
    
    images: [
      'https://otticascauzillo.com/images/thumbs/0012943_occhiale-da-vista-in-metallo-tom-ford-ft-5631-col001-oro-e-nero.png',
      'https://otticascauzillo.com/images/thumbs/0012944_occhiale-da-vista-in-metallo-tom-ford-ft-5631-col001-oro-e-nero.png',
      'https://otticascauzillo.com/images/thumbs/0012945_occhiale-da-vista-in-metallo-tom-ford-ft-5631-col001-oro-e-nero.png',
      'https://otticascauzillo.com/images/thumbs/0012946_occhiale-da-vista-in-metallo-tom-ford-ft-5631-col001-oro-e-nero.png'
    ],
    name: "Tom Ford Eyeglasses",

    description: "Tom Ford eyeglasses are beloved for their timeless design and their masterful fusion of vintage glamor with modern sophistication. Each pair of Tom Ford sunglasses and reading glasses is made in Italy using top-quality materials and meticulous attention to detail.",
    price: 2999.99,
    specifications: {
      brand: "Tom Ford",
      color: "Gold and Black",
      material: "Metal",
      style: "FT-5631"
    }
  };

  const [activeImage, setActiveImage] = useState(product.images[0]);

  const handleImageClick = (image) => {
    setActiveImage(image);
  };
  const handleAddToCart =(product)=>{
    dispatch({type:'ADD_TO_CART',payload:product});
  }

 /* const handleAddToCart = (item) => {
    console.log("Item added to cart:", item);
  };
*/
  return (
    <div className="product-page">
      <h1 className="product-name">{product.name}</h1>
      <div className="product-content">
        <div className="product-image">
          <img src={activeImage} alt={product.name} className="main-image" />
        </div>

        <div className="product-details">
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-specifications">
            <h2>Specifications</h2>
            <ul>
              <li><strong>Brand:</strong> {product.specifications.brand}</li>
              <li><strong>Color:</strong> {product.specifications.color}</li>
              <li><strong>Material:</strong> {product.specifications.material}</li>
              <li><strong>Style:</strong> {product.specifications.style}</li>
            </ul>
          </div>
          <div className="product-price">Rs{product.price}</div>
          <Link to="/cart">
            <button className="add-to-cart-button" onClick={() => handleAddToCart({
               id: 1, name: 'Product 1', price: 500,image: 'p1.png'
              })}
            >
              Add to Cart
            </button>
          </Link>
        </div>
       
      </div>
    </div>
  );
}

export default ProductPage;