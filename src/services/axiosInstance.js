import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://xrlab.hs-harz.de/co2back/api'
    : '/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});

/*
axiosInstance.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('accessToken');

        if (authService.isTokenExpired()) {
            try {
                const { access_token } = await authService.refreshToken();
                token = access_token;
            } catch (error) {
                console.error('Error refreshing token:', error);
                authService.logout();
                window.location.href = '/login';
                throw error;
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized: Redirecting to login...');
            authService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
*/

export default axiosInstance;
