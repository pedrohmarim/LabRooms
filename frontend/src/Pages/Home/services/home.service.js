import api from "../../../services/api";

export async function register(data) {
  return api.post("/test", data);
}
