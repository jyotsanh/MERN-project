import React, { useState, useEffect } from 'react';
import './Sunglasses.css';
import { FetchProductsUser } from '../../service/api';
import { Link } from 'react-router-dom';

function Sunglasses() {
  const [visibleSubOptions, setVisibleSubOptions] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await FetchProductsUser();
        const { Product } = productsData;
        setProducts(Product);
        setFilteredProducts(Product);
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const toggleSubOptions = (option) => {
    setVisibleSubOptions((prevVisibleSubOptions) => ({
      ...prevVisibleSubOptions,
      [option]: !prevVisibleSubOptions[option],
    }));
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const applyFilters = () => {
    let filtered = products;

    if (selectedPrice) {
      filtered = filtered.filter((product) => {
        if (selectedPrice === 'Under Rs 500') {
          return product.price < 500;
        } else if (selectedPrice === 'Rs 500 - Rs 2000') {
          return product.price >= 500 && product.price <= 2000;
        } else if (selectedPrice === 'Over Rs 2000') {
          return product.price > 2000;
        }
        return true;
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after applying filters
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container">
      <h1>Sunglasses</h1>
      <div className="main-content">
        <div className="side-navbar">
          <div className="side-options">
            <div className="side-option" onClick={() => toggleSubOptions('price')}>
              Price
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.price ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="under50"
                  name="price"
                  value="Under Rs 500"
                  checked={selectedPrice === 'Under Rs 500'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="under50">Under Rs 500</label>
              </div>
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="50to100"
                  name="price"
                  value="Rs 500 - Rs 2000"
                  checked={selectedPrice === 'Rs 500 - Rs 2000'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="50to100">Rs 500 - Rs 2000</label>
              </div>
              <div className="side-sub-option">
                <input
                  type="radio"
                  id="over100"
                  name="price"
                  value="Over Rs 2000"
                  checked={selectedPrice === 'Over Rs 2000'}
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <label htmlFor="over100">Over Rs 2000</label>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option" onClick={() => toggleSubOptions('category')}>
              Category
              <span>+</span>
            </div>
            <div
              className="side-sub-options"
              style={{ display: visibleSubOptions.category ? 'block' : 'none' }}
            >
              <div className="side-sub-option">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  <option value="prescription">prescription</option>
                  <option value="reading">Reading</option>
                  <option value="blue-light">Blue Light</option>
                  <option value="progressive">Progressive</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="bifocal">Bifocal</option>
                  <option value="sports">Sports</option>
                  <option value="fashion">Fashion</option>
                </select>
              </div>
            </div>
            <div className="side-line"></div>

            <div className="side-option">
              <button onClick={applyFilters}>Filter</button>
            </div>
          </div>
        </div> {/* Side-Navbar div */}

        <div className="product-list-container">
          <div className="product-list">
            {currentProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
                <div className="product-card">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img src={`/${product.imageUrls[0]}`} alt={product.name} className="product-image" />
                  ) : (
                    <img src="/path/to/default-image.jpg" alt="Default" className="product-image" />
                  )}
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">Price: Rs.{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}>
              Next
            </button>
          </div>
        </div> {/* Product-list div */}
      </div> {/* Main-content */}
    </div>
  );
}

export default Sunglasses;
