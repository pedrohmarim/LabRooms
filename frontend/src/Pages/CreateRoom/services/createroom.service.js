import api from "../../../services/api";

export async function createRoom(dto, token) {
  return api.post("/createRoom", dto, {
    headers: {
      Authorization: token,
    },
  });
}

export async function getCategories() {
  return api.get("/categories");
}
