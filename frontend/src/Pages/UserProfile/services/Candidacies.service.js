import api from "../../../services/api";

export async function getCandidaciesByRoomId(roomId, token) {
  return api.get("/getCandidaciesByRoomId", {
    headers: {
      Authorization: token,
      roomId: roomId,
    },
  });
}
