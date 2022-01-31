import api from "../../../services/api";

export async function getCurrentUser(id) {
  return api.get(`/currentUser/${id}`);
}

export async function getRooms() {
  return api.get("/getRooms");
}
