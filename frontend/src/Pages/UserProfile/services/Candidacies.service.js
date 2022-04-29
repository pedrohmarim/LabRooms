import api from "../../../services/api";

export async function getCandidaciesByRoomId(roomId, token) {
  return api.get("/getCandidaciesByRoomId", {
    headers: {
      Authorization: token,
      roomId: roomId,
    },
  });
}

export async function deleteCandidacieById(_id, token) {
  return api.delete("/deleteCandidacieById", {
    headers: {
      Authorization: token,
      _id,
    },
  });
}
