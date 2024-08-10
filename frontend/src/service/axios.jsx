import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const instance = axios.create({
    baseURL: 'http://localhost:8000/', // Replace with your actual base URL
});

instance.interceptors.request.use(
    (config) => {
        const token = cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
