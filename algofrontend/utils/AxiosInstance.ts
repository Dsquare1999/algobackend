import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from 'jwt-decode';
import dayjs from "dayjs";

let accessToken: string | null = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : "";
let refresh_token: string | null = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')!) : "";

console.log('access: ', accessToken);

const baseURL = 'http://localhost:8000/api/v1/';

const Axios: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: localStorage.getItem('token') ? `Bearer ${accessToken}` : "" },
});

Axios.interceptors.request.use(async (req: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    if (accessToken) {
        req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${accessToken}` : "";
        const user: { exp: number } = jwtDecode(accessToken);
        const isExpired: boolean = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req;
        try {
            const resp = await axios.post(`${baseURL}auth/token/refresh/`, { refresh: refresh_token });
            console.log('new_accesstoken: ', resp.data.access);
                localStorage.setItem('token', JSON.stringify(resp.data.access));
                req.headers.Authorization = `Bearer ${resp.data.access}`;
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    } else {
        req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token')!)}` : "";
    }
    return req;
});

export default Axios;