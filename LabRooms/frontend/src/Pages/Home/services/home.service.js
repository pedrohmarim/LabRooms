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

export async function getDashboardUsers(usersIds, userId, token) {
  return api.get("/getDashboardUsers", {
    headers: {
      Authorization: token,
      usersIds,
      requestId: userId,
    },
  });
}

export async function updateDashboard(dto, token) {
  return api.post("/updateDashboardUsers", dto, {
    headers: {
      Authorization: token,
    },
  });
}

export async function getUsers(userId) {
  return api.get("/getUsers", {
    headers: {
      _id: userId,
    },
  });
}

export async function getRecomendedRooms(categoryId, token) {
  return api.get("/getRecomendedRooms", {
    headers: {
      Authorization: token,
      categoryId,
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

export async function getUsersByCategory(categoryId, userId) {
  return api.get("/getUsersByCategory", {
    headers: {
      categoryId,
      _id: userId,
    },
  });
}

export async function getUserById(_id) {
  return api.get("/getUserById", {
    headers: {
      _id,
    },
  });
}

export async function getRoomById(_id) {
  return api.get("/getRoomById", {
    headers: {
      _id,
    },
  });
}

export async function handleVerifyApply(_id, roomId) {
  return api.get("/verifyApply", {
    headers: {
      _id,
      roomId,
    },
  });
}
