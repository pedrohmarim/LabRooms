import Axios from "axios";

const api = Axios.create({
  baseURL: `${window.location.href}:4000`,
});

export default api;
