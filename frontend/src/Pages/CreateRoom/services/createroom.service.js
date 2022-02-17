import api from "../../../services/api";

export async function createRoom(dto, token) {
  return api.post("/createRoom", dto, {
    headers: {
      Authorization: token,
    },
  });
}

export async function getCategories() {
  return api.get("/categories");
}

export async function UpdateRoom(dto, token) {
  return api.post("/updateRoom", dto, {
    headers: {
      Authorization: token,
    },
  });
}

export async function DeleteRoom(_id, token) {
  return api.post(
    "/deleteRoom",
    { _id: _id },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
