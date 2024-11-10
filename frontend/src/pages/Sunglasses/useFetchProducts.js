// useFetchProducts.js
import { useState, useEffect, useCallback } from 'react';
import { FetchSunglassesProductsUser, FetchFilteredProducts, FetchFilteredSunglassesProducts } from '../../service/api';

export const useFetchProducts = (currentPage, isFiltered, filters, totalPages, setTotalPages) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the filter processing function
  const processFilters = useCallback((filters) => {
    return Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        setErrorMessage('');
        let productsData;
        
        if (isFiltered) {
                const nonEmptyFilters = processFilters(filters); // this will remove any empty values from the filters object 
                
                // Only proceed with filtered fetch if there are actual filters
                if (Object.keys(nonEmptyFilters).length > 0) {
                  console.log('Applying filters:', nonEmptyFilters);
                  productsData = await FetchFilteredSunglassesProducts(nonEmptyFilters);
                  console.log('Filtered Fetching products Hook is used');
                } else {
                  // Fallback to regular fetch if no actual filters despite isFiltered being true
                  console.log('No active filters, falling back to regular fetch');
                  productsData = await FetchSunglassesProductsUser(currentPage);
                }
        } else {
                productsData = await FetchSunglassesProductsUser(currentPage);
        }
        
        if (isMounted) {
              setProducts(productsData.Products);
              setTotalPages(productsData.totalPages);
        }
      } catch (error) {
        if (!isMounted) return;

        console.error('Error in useFetchProducts:', error);
        
        if (error.response?.status === 404) {
          setErrorMessage(`${error.response.data.msg || 'No products found'}`);
          setProducts([]);
          setTotalPages(0);
        } else {
          setErrorMessage(
            `An error occurred while fetching products. ${
              error.response?.data?.msg || 'Please try again later.'
            }`
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [currentPage, isFiltered, filters, processFilters]);

  return {
    products,
    totalPages,
    errorMessage,
    isLoading,
    setTotalPages
  };
};