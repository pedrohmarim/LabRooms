const RoomModel = require("../models/RoomModel");

module.exports = {
  async handleCreate(request, response) {
    let {
      title,
      description,
      category,
      owner,
      uid,
      name,
      size,
      type,
      lastModified,
    } = request.body;

    if (category === "$oth") category = "Outros";

    RoomModel.create({
      title,
      description,
      category,
      owner,
      thumb: {
        uid,
        name,
        size,
        type,
        lastModified,
      },
    })
      .then(() => {
        return response.json({
          message: "Sala criada com succeso!",
          success: true,
        });
      })
      .catch(() => {
        return response.json({
          message: "Erro ao criar sala.",
        });
      });
  },
  async handleGetRooms(request, response) {
    const result = await RoomModel.find();
    return response.json(result);
  },
};
