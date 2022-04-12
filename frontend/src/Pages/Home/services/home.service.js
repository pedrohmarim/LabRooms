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

export async function getRecomendedRooms(
  newCategory,
  categoryId,
  subCategories,
  token
) {
  return api.get("/getRecomendedRooms", {
    headers: {
      Authorization: token,
      newCategory: newCategory,
      categoryId: categoryId,
      subCategories: subCategories,
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
