import api from "../../../services/api";

export async function getRoomsByOwnerId(owner, token) {
  return api.get("/getRoomsByOwnerId", {
    headers: {
      Authorization: token,
      owner,
    },
  });
}
export async function UpdateUserInfo(dto, token) {
  return api.post("/updateUserInfo", dto, {
    headers: {
      Authorization: token,
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
