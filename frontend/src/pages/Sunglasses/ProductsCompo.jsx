// ProductsCompo.jsx
import React, { useMemo } from "react";
import { Link } from 'react-router-dom';
import { useFetchProducts } from './useFetchProducts';

const ProductList = React.memo(({ products }) => (
  <div className="product-list">
    {products.map((product) => (
      <Link to={`/product/${product._id}`} key={product._id} className="product-card-link">
        <div className="product-card">
          {product.imageUrls && product.imageUrls.length > 0 ? (
            <img src={`${product.imageUrls[0]}`} alt={product.name} className="imagess" />
          ) : (
            <img src="/path/to/default-image.jpg" alt="Default" className="imagess" />
          )}
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price"> Rs.{product.price}</p>
        </div>
      </Link>
    ))}
  </div>
));

const Pagination = React.memo(({ currentPage, totalPages, handlePrevPage, handleNextPage }) => (
  <div className="pagination">
    <button onClick={handlePrevPage} disabled={currentPage === 1}>
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
      Next
    </button>
  </div>
));

export default function ProductsCompo({
  currentPage,
  totalPages,
  setTotalPages,
  handleNextPage,
  handlePrevPage,
  selectedPrice,
  selectedFrameMaterial,
  selectedLensMaterial,
  selectedFrameShape,
  isFiltered
}) {
  const filters = useMemo(() => ({
    price: selectedPrice,
    frameMaterial: selectedFrameMaterial,
    lensMaterial: selectedLensMaterial,
    frameShape: selectedFrameShape,
    page: currentPage,
  }), [
    selectedPrice,
    selectedFrameMaterial,
    selectedLensMaterial,
    selectedFrameShape,
    currentPage
  ]);

  const { 
    products, 
    errorMessage, 
    isLoading 
  } = useFetchProducts(currentPage, isFiltered, filters, totalPages, setTotalPages);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-list-container">
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="no-products-message">
          {errorMessage || 'No products available.'}
        </div>
      )}

      {totalPages > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      )}
    </div>
  );
}