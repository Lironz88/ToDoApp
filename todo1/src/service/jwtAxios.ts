import axios from 'axios';
import { updateToken } from '../redux/AuthState';
import { store } from '../redux/store';

const jwtAxios = axios.create();

const getToken = () => store.getState().authState.userToken;

jwtAxios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

jwtAxios.interceptors.response.use((response) => {
    const newToken = response.headers['Authorization'] || response.headers['authorization'];
    if (newToken) {
        store.dispatch(updateToken(newToken));
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default jwtAxios;
