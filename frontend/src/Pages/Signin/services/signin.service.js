import api from "../../../services/api";

export async function loginUser(dto) {
  const { email, password } = dto;

  return api.get("/userLogin", {
    headers: {
      email,
      password,
    },
  });
}
