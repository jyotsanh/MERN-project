import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL;


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
export const UploadProducts = async (formdata,token) => {
    const response = await axios.post(`${URL}/add-products`, formdata,
        {
            headers: {
                'Authorization': token
            }
        }
    );
    return response;
};

// development in User products data fetched from backend
export const FetchProducts = async () => {
   
    const response = await axios.get(`${URL}/products`);
    return response.data;
};

// product can be deleted for admin
export const deleteProduct = async (id,token) => {
    const response = await axios.delete(`${URL}/delete-product/${id}`,
        {
            headers: {
                'Authorization': token
            }
        }
    );
    return response;
};

// product can be edditable for admin
export const editProduct = async (id, updatedData,token) => {
    const response = await axios.put(`${URL}/edit-product/${id}`, updatedData,
        {
            headers: {
                'Authorization': token
            }
        }
    );
    return response;
};

// appointments data is fetched for admin from backend
export const getAppointments = async () => {
    const response = await axios.get(`${URL}/get-appointments`);
    return response.data;
}

// setting appoints data api handler
export const setAppointments = async (data) => {
    const response = await axios.post(`${URL}/appointment`, data);
    return response.data;  
}

// admin login data
export const AdminLogin = async (data) => {
    console.log(data)
    const response = await axios.post(`${URL}/admin-login`, data);
    return response.data;
}


// all for products data fetched from backend for User
export const FetchProductsUser = async () => {
    const response = await axios.get(`${URL}/user-products`);
    return response.data;
}

// id specific product detail fetched from backend
export const FetchProductWithId = async (id) => {
    const response = await axios.get(`${URL}/products/${id}`);
    return response.data;
}