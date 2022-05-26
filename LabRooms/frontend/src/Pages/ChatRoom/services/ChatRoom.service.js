import api from "../../../services/api";

export async function handleApply(dto, token) {
  return api.post("/apply", dto, {
    headers: {
      Authorization: token,
    },
  });
}
