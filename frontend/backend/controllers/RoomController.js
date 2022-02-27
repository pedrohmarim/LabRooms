const RoomModel = require("../models/RoomModel");

module.exports = {
  async handleCreate(request, response) {
    const { _id } = request.body.decoded;

    let { title, description, categoryId, newCategory, thumb } = request.body;

    RoomModel.create({
      title,
      description,
      categoryId,
      newCategory,
      owner: _id,
      thumb,
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
    const rooms = await RoomModel.find();
    return response.json({ rooms, loading: false });
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
        result = await RoomModel.find({ categoryId: null }); // Filtra todas as salas que possuem Categoria = "Outros"
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

  handleUpdateRoom(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { roomTitle, roomCategory, roomDescription, newCategory, _id } =
        request.body;

      RoomModel.findByIdAndUpdate(
        { _id },
        {
          title: roomTitle,
          description: roomDescription,
          categoryId:
            roomCategory === 11 || roomCategory === 12 ? null : roomCategory, //11 = categoria "outras"
          newCategory:
            roomCategory && roomCategory !== 11 && roomCategory !== 12
              ? null
              : newCategory,
        },
        { new: true },
        function (err) {
          if (err) {
            return response.json({
              message: "Erro ao atualizar informações.",
            });
          } else {
            response.json({
              message: "Informações atualizadas com sucesso.",
              status: 200,
            });
          }
        }
      );
    }
  },

  handleDeleteRoom(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { _id } = request.body;

      RoomModel.findByIdAndRemove({ _id }, { new: true }, function (err) {
        if (err) {
          return response.json({
            message: "Erro ao excluir sala.",
          });
        } else {
          response.json({
            message: "Sala excluída com sucesso.",
            status: 200,
          });
        }
      });
    }
  },
};
