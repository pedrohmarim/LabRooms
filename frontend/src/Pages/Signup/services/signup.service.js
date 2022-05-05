import api from "../../../services/api";

export async function userRegister(dto) {
  return api.post("/userRegister", dto);
}
