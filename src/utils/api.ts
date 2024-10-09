import axios, { AxiosRequestConfig } from 'axios';
import { toast } from './toast';
const local = `http://localhost:4001`;
const server = `https://back2.livewater.uz`;
import Cookies from 'js-cookie';
let refreshTokenPromise: Promise<any> | null = null;
export const api = axios.create({
    baseURL: server,
    headers: { 'Content-type': 'application/json' }
});
export const setAuthToken = (token : string | undefined) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };
  
  setAuthToken(Cookies.get('accsessToken'));
// Add a request interceptor to refresh token on 401 responses
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // If error is a 401 (Unauthorized) and we haven't already tried refreshing the token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenPromise) {
                // Refresh token logic here
                refreshTokenPromise = api
                    .post('/auth/refresh', {
                        refreshToken: Cookies.get('refreshToken') // Or cookie-based
                    })
                    .then(res => {
                        const newAccessToken = res.data.access_token;
                        Cookies.set('accsessToken', newAccessToken);
                        refreshTokenPromise = null;
                        return newAccessToken;
                    });
            }

            // Wait for the refresh token promise to resolve
            const newAccessToken = await refreshTokenPromise;

            // Update the Authorization header with the new access token
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Retry the original request
            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);
export const deleteItem = (url: string, header: AxiosRequestConfig<any>) => {
    api.delete(url, header)
        .then(_ => {
            toast.fire({
                text: "Muvaffaqqiyatli o'chirildi",
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true
            });
        })
        .catch(err => {
            toast.fire({
                text: err.response.data.msg || err.message,
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true
            });
        });
};
