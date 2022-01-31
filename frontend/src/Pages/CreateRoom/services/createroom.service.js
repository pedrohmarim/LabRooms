import api from "../../../services/api";

export async function createRoom(dto) {
  return api.post("/createRoom", dto);
}
