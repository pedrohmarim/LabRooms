import Axios from "axios";
import { MontaUrlDominio } from "../Helpers/UrlDominio";

const api = Axios.create({ baseURL: MontaUrlDominio() });

export default api;
