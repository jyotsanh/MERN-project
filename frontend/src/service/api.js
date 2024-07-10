import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL;



export const registerUser = async (formdata) => {
    const response = await axios.post(`${URL}/user-register`, formdata);
    return response;
};

export const LoginUser = async (formdata) => {
    const response = await axios.post(`${URL}/user-login`, formdata);
    return response.data;
};

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

export const FetchProducts = async () => {
   
    const response = await axios.get(`${URL}/products`);
    return response.data;
};

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


export const getAppointments = async () => {
    const response = await axios.get(`${URL}/get-appointments`);
    return response.data;
}

export const setAppointments = async (data) => {
    const response = await axios.post(`${URL}/appointment`, data);
    return response.data;  
}


export const AdminLogin = async (data) => {
    console.log(data)
    const response = await axios.post(`${URL}/admin-login`, data);
    return response.data;
}