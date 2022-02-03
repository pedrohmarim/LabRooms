const RoomModel = require("../models/RoomModel");
const CategoriesModel = require("../models/CategoriesModel");

module.exports = {
  async handleCreate(request, response) {
    let {
      title,
      description,
      categoryId,
      newCategory,
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
      newCategory,
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
};
