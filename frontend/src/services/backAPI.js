import Axios from 'axios';

const api = Axios.create({baseURL: 'http://localhost:4000'}); // ve se arruma isso aqui para .env

export default api;