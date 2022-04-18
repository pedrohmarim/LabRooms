import api from "../../../services/api";

export async function getCurrentUser(token) {
  return api.get("/currentUser", {
    headers: {
      Authorization: token,
    },
  });
}

export async function getRooms() {
  return api.get("/getRooms");
}

export async function getUsers(userId) {
  return api.get("/getUsers", {
    headers: {
      _id: userId
    }
  });
}

export async function getRecomendedRooms(
  newCategory,
  categoryId,
  subCategories,
  token
) {
  return api.get("/getRecomendedRooms", {
    headers: {
      Authorization: token,
      newCategory,
      categoryId,
      subCategories,
    },
  });
}

export async function getRecomendedUsers(owner, token) {
  return api.get("/getRecomendedUsers", {
    headers: {
      Authorization: token,
      owner,
    },
  });
}

export async function getRoomsByCategory(categoryId) {
  return api.get("/getRoomsByCategory", {
    headers: {
      categoryId,
    },
  });
}
