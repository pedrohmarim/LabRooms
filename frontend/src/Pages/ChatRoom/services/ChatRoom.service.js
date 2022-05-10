import api from "../../../services/api";

export async function getRoomById(_id) {
  return api.get("/getRoomById", {
    headers: {
      _id,
    },
  });
}

export async function handleApply(dto, token) {
  return api.post("/apply", dto, {
    headers: {
      Authorization: token,
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

export async function getCategoryById(_id) {
  return api.get("/getCategoryById", {
    headers: {
      _id,
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
