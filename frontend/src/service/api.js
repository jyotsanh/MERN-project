import axios from 'axios';

export const registerUser = async (formdata) => {
    const response = await axios.post('http://localhost:3000/api/user-register', formdata);
    return response;
};

export const LoginUser = async (formdata) => {
    const response = await axios.post('http://localhost:3000/api/user-login', formdata);
    return response;
};

export const UploadProducts = async (formdata) => {
    const response = await axios.post('http://localhost:3000/api/add-products', formdata);
    return response;
};

export const FetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/api/products');
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/delete-product/${id}`);
    return response;
};

export const editProduct = async (id, updatedData) => {
    const response = await axios.put(`http://localhost:3000/api/edit-product/${id}`, updatedData);
    return response;
};


export const getAppointments = async () => {
    const response = await axios.get('http://localhost:3000/api/get-appointments');
    return response.data;
}

export const setAppointments = async (data) => {
    const response = await axios.post('http://localhost:3000/api/appointment', data);
    return response.data;  
}