import api from "../../../services/api";

export async function getCurrentUser(token) {
  return api.get('/currentUser', {
    headers:{
      Authorization: token,
    }
  });
}

export async function getRooms() {
  return api.get("/getRooms");
}

export async function getRoomsByCategory(categoryId) {
  return api.get("/getRoomsByCategory", {
    headers: {
      categoryId,
    },
  });
}
