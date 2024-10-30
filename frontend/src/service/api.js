import axios from 'axios'; // Ensure axios is imported only once

const URL = import.meta.env.VITE_BASE_URL; // Use environment variable for the base URL

// handles new register user data
export const registerUser = async (formdata) => {
    const response = await axios.post(`${URL}/user-register`, formdata);
    return response;
};

// Normal User log-in data
export const LoginUser = async (formdata) => {
    const response = await axios.post(`${URL}/user-login`, formdata);
    return response.data;
};

// Admin Uploads new products
export const UploadProducts = async (formdata, token) => {
    const response = await axios.post(`${URL}/add-products`, formdata, {
        headers: {
            'Authorization': `${token}` // Ensure token is prefixed with 'Bearer '
        }
    });
    return response;
};

// development in User products data fetched from backend
export const FetchProducts = async (page = 1, limit = 8, filters = {}) => {
    const response = await axios.get(`${URL}/products`, {
        params: {
            page,
            limit,
            ...filters // Spread the filters object to pass as query params
        }
    });
    return response.data;
};

export const FetchProductInfoAsAdmin = async (id,token) => {
    const response = await axios.get(`${URL}/admin/product/${id}`,{
        headers: {
            'Authorization': `${token}` // Ensure token is prefixed with 'Bearer '
        }
    });
    return response.data;
}


// product can be deleted for admin
export const deleteProduct = async (id, token) => {
    const response = await axios.delete(`${URL}/delete-product/${id}`, {
        headers: {
            'Authorization': `${token}` // Ensure token is prefixed with 'Bearer '
        }
    });
    return response;
};

// product can be edditable for admin
export const editProduct = async (id, updatedData, token) => {
    const response = await axios.put(`${URL}/edit-product/${id}`, updatedData, {
        headers: {
            'Authorization': `${token}` // Ensure token is prefixed with 'Bearer '
        }
    });
    return response.data;
};

// appointments data is fetched for admin from backend
export const getAppointments = async () => {
    const response = await axios.get(`${URL}/get-appointments`);
    return response.data;
};

// setting appoints data api handler
export const setAppointments = async (data) => {
    const response = await axios.post(`${URL}/appointment`, data);
    return response.data;  
};

// admin login data
export const AdminLogin = async (data) => {
    console.log(data);
    const response = await axios.post(`${URL}/admin-login`, data);
    return response.data;
};

// all for products data fetched from backend for User
export const FetchProductsUser = async (page = 1) => {
    const response = await axios.get(`${URL}/user-products`, {
        params: { page }
    });
    return response.data;
};

// id specific product detail fetched from backend
export const FetchProductWithId = async (id) => {
    const response = await axios.get(`${URL}/products/${id}`);
    return response.data;
};

// update the status of an appointment (admin)
export const updateAppointmentStatus = async (id, status) => {
    const response = await axios.put(`${URL}/appointments/status`, { id, status });
    return response.data.appointment;
};

// delete an appointment by ID (admin)
export const deleteAppointment = async (id) => {
    try {
        const response = await axios.delete(`${URL}/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};

// Add a product to the cart
export const addToCart = async (payload, token) => {
    try {
        // console.log(`api ${token} : ${payload}`)
        const response = await axios.post(`${URL}/add-to-cart`, payload, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Get cart items
export const getCartItems = async (token) => {
    try {
        const response = await axios.get(`${URL}/get-cart-items`, {
            headers: { Authorization: `${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

// Delete cart item
export const deleteCartItem = async (productId, token) => {
    try {
        const response = await axios.post(`${URL}/del-cart-items`,  {productId},{
            headers: { Authorization: `${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw error;
    }
};

// Place a new order
export const placeOrder = async (orderData, token) => {
    try {
        const response = await axios.post(`${URL}/order`, orderData, {
            headers: {
                Authorization: `${token}`, // Ensure token is prefixed with 'Bearer' if necessary
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error placing order:', error);
        throw error; // Handle errors appropriately
    }
};
// Fetch user order with token
export const getUserOrder = async (token) => {
    const response = await axios.get(`${URL}/user-order`, {
        headers: {
            Authorization: `${token}`, // Ensure token is prefixed with 'Bearer' if necessary
        },
    });
    return response;
};


export const recentProducts = async () => {
    const response = await axios.get(`${URL}/recent-products`);
    return response.data;
};

export const getAdminOrders = async (token) => {
    const response = await axios.get(`${URL}/get-orders`, {
        headers: {
            Authorization: `${token}`, // Ensure token is prefixed with 'Bearer' if necessary
        },
    });
    return response.data;
};

export const adminUpdateOrderStatus = async (orderId, newStatus, token) => {
    const response = await axios.put(`${URL}/update-order-status/${orderId}`, { status: newStatus }, {
        headers: {
            Authorization: `${token}`, // Ensure token is prefixed with 'Bearer' if necessary
        },
    });
    return response.data;
};


export const FetchFilteredProducts = async (filters) => {
    try {
      const response = await axios.post(`${URL}/products/filter`, filters);
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw error;
    }
  };

