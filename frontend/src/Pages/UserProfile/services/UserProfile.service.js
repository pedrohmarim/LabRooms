import api from "../../../services/api";

export async function getRoomsByOwnerId(owner) {
  return api.get("/getRoomsByOwnerId", {
    headers: {
      owner,
    },
  });
}
