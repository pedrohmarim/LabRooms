import api from "../../../services/api";

export async function getCurrentUser(id) {
  return api.get(`/currentUser/${id}`);
}
