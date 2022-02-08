const RoomModel = require("../models/RoomModel");

module.exports = {
  async handleCreate(request, response) {
    const { _id } = request.body.decoded;

    let {
      title,
      description,
      categoryId,
      newCategory,
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
      newCategory,
      owner: _id,
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

  async handleGetRoomsByCategory(request, response) {
    const { categoryid } = request.headers;

    let result = null;

    switch (categoryid) {
      case "10":
        result = await RoomModel.find();
        if (result) return response.json(result); // Filtra todas as salas ao selecionar Categoria = "Todas"
        break;
      case "11":
        result = await RoomModel.find({ categoryId: 11 }); // Filtra todas as salas que possuem Categoria = "Outros"
        if (result) return response.json(result);
        break;
      default:
        result = await RoomModel.find({ categoryId: categoryid }); // Filtra salas por Categoria
        if (result) return response.json(result);
        break;
    }
  },

  async handleGetRoomsById(request, response) {
    const { _id } = request.headers;

    const result = await RoomModel.findOne({ _id });

    if (result) {
      return response.json(result);
    } else {
      return response.json(null);
    }
  },
};
