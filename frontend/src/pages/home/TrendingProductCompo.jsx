// library import
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useCart } from '../../context/CartContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// api import
import { addToCart } from '../../service/api';
// Env import
const URL = import.meta.env.VITE_BASE_URL;
const isTokenValid = () => {
    const token = Cookies.get('token');
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
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
export default function TrendingProductCompo() {
    const [recentProducts, setRecentProducts] = useState([]);
    const [addedProducts, setAddedProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(
        () => {
                console.log("Trending component mounted");
                const fetchRecentProducts = async () => {
                  try {
                    const response = await axios.get(`${URL}/recent-products`); // Use the full URL
                    const recentProducts = response.data.RecentProducts;
                    setRecentProducts(recentProducts);
                  } catch (error) {
                    console.error('Error fetching recent products:', error);
                  }
                };
                fetchRecentProducts();
      }, []
    );
    useEffect(
        () => {
                  // Save addedProducts to localStorage whenever it changes
                  localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
        }, [addedProducts]
      );
    const handleAddToCart = async (product) => {
        if (!isTokenValid()) {
          toast.error('Please log in to add items to your cart');
          navigate("/login");
          return;
        }
    
        try {
          const token = Cookies.get('token');
          const decodedToken = jwtDecode(token);
    
          const payload = {
            userId: decodedToken.userId,
            items: [{
              productId: product._id,
              name: product.name,
              imageUrl: product.imageUrls[0],
              quantity: 1,
              price: product.price
            }]
          };
    
          const response = await addToCart(payload, token);
          // console.log(response);
          toast.success('Product added to cart successfully');
          setAddedProducts(prev => [...prev, product._id]);
        } catch (error) {
                console.error('Error adding product to cart:', error);
                toast.error('Failed to add product to cart. Please try again.');
        }
      };
    const isProductAdded = (productId) => {
        return isTokenValid() && addedProducts.includes(productId);
      };
    return (
        <>
            {/* Top Trending Products Section */}
            <section className="top-trending-products py-8 px-4 bg-gray-100">
                <h3 className="text-lg font-medium text-center text-orange-600 mb-2">Top Products</h3>
                <h2 className="text-2xl font-bold text-center text-orange-700 mb-6">Top Trending Products</h2>
                <Slider {...multipleItemsSettings}>
                {
                    recentProducts?.map(
                        (product) => (
                            <div className="product bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105" key={product._id}>
                                <div className="image-container relative group">
                                    <Link to={`/product/${product._id}`} className="block">
                                        <img
                                            src={product.imageUrls[0]}
                                            alt={product.name}
                                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </Link>
                                    <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="icon flex items-center justify-center p-2 bg-white rounded-full shadow-md">
                                            <li key={`heart-${product._id}`} onClick={() => handleAddToCart(product)} className="cursor-pointer">
                                            {
                                                isProductAdded(product._id) ? (
                                                <AiFillHeart className="text-red-500 text-xl" />
                                            ) : (
                                                <AiOutlineHeart className="text-red-500 text-xl" />
                                                )
                                            }
                                            </li>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center mt-2 text-orange-600 font-medium">{product.name}</p>
                                <p className="price text-center text-gray-600">Rs {product.price}</p>
                            </div>
                        )
                    )
                }
                </Slider>
            </section>
        </>
    );
}