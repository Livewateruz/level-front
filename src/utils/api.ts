import axios, { AxiosRequestConfig } from 'axios';
import { toast } from './toast';
const local = `http://localhost:4001`
const server = `https://back2.livewater.uz`
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: local,
    headers: { 'Content-type': 'application/json' ,authorization: `Bearer ${Cookies.get('passport')}`  }
});

// api.interceptors.request.use(config => {
//     const token = Session.get('token'); // Retrieve the token dynamically
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
export const deleteItem = (url: string, header: AxiosRequestConfig<any>) => {
    api.delete(url, header).then(_ => {
        toast.fire({
            text: "Muvaffaqqiyatli o'chirildi",
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true
        });
    }).catch((err)=>{
        toast.fire({
            text: err.response.data.msg || err.message ,
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true
        });
    });
};
