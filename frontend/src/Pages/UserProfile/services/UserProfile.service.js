import api from "../../../services/api";

export async function getRoomsByOwnerId(owner) {
  return api.get("/getRoomsByOwnerId", {
    headers: {
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
