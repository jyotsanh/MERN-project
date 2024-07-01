import axios from 'axios';


export const registerUser = async (formdata)=>{
    const response = await axios.post('http://localhost:3000/api/user-register',formdata)

    return response
}

export const LoginUser = async (formdata)=>{
    const response = await axios.post('http://localhost:3000/api/user-login',formdata)
    return response;
}

export const UploadProducts = async (formdata)=>{
    const response = await axios.post('http://localhost:3000/api/add-products',formdata)
    return response;

}