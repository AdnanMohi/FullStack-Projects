import axios from 'axios';

const tokenInLocalStorage = localStorage.getItem('token');// can be undefined can be there

export const apiV1Instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 5000,
    responseType: 'json',
    headers: {
        Authorization: tokenInLocalStorage ? `Bearer ${tokenInLocalStorage}`: undefined
    }
    });

