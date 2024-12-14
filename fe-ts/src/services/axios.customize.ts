import axios, { AxiosError } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response && response.data) return response.data
    return response;
}, function (error: AxiosError) {
    if (error && error.response && error.response.data) return error.response.data
    return Promise.reject(error);
});

export default instance