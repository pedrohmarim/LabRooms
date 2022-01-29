import api from "../../../services/api";

export async function userRegister(data) {
  return api.post("/userRegister", data);
}
