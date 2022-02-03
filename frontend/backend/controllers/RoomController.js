const RoomModel = require("../models/RoomModel");
const CategoriesModel = require("../models/CategoriesModel");

module.exports = {
  async handleCreate(request, response) {
    let {
      title,
      description,
      categoryId,
      owner,
      uid,
      name,
      size,
      type,
      lastModified,
    } = request.body;

    RoomModel.create({
      title,
      description,
      categoryId,
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

  async handleGetCategory(request, response) {
    const result = await CategoriesModel.find();
    return response.json(result);
  },

  async handleGetRoomsByCategory(request, response) {
    const { categoryid } = request.headers;
    const result = await RoomModel.find({ categoryId: categoryid });
    return response.json(result);
  },
};
