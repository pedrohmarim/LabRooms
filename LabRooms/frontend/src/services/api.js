import Axios from "axios";

const api = Axios.create({
  baseURL: `${window.location.href.slice(0, -1)}:4000`,
});

export default api;
