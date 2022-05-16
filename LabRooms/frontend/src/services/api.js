import Axios from "axios";

const api = Axios.create({
  baseURL: `${window.location.href}:4000`,
}); // ver se arruma isso aqui para .env

export default api;
