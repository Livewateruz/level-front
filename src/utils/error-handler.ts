import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import Swal from 'sweetalert2';

interface CustomResponse<T = any> extends AxiosResponse {
    data: T;
}

interface CustomError extends AxiosError {
    response?: CustomResponse<any>;
}

export function ErrorHandler (err: CustomError, navigate: NavigateFunction) {
    if (err?.response?.data?.statusCode === 401) {
        Swal.fire({  title: 'Xatolik!', text: err.response?.data?.message || err.message, icon: 'error', customClass: 'sweet-alerts' });

        navigate('/login');

    }
}
