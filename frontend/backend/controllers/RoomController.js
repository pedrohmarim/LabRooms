const RoomModel = require("../models/RoomModel");
const UserModel = require("../models/userModel");

module.exports = {
  async handleCreate(request, response) {
    const { _id } = request.body.decoded;

    const user = await UserModel.findOne({ _id });

    // 1 - TIPO_CADASTRO = FREELANCER
    if (user?.accountType === 1) throw new Error("Não Autorizado");

    let {
      title,
      description,
      categoryId,
      newCategory,
      thumb,
      ownerName,
      subCategories,
    } = request.body;

    RoomModel.create({
      title,
      description,
      categoryId,
      subCategories,
      newCategory,
      owner: _id,
      thumb,
      ownerName,
    })
      .then(() => {
        return response.json({
          message: "Projeto Criado com Sucesso.",
          success: true,
        });
      })
      .catch(() => {
        return response.json({
          message: "Erro ao Criar Projeto.",
        });
      });
  },

  async handleGetRooms(request, response) {
    const rooms = await RoomModel.find();
    return response.json({ rooms, loading: false });
  },

  async handleGetRoomsByCategory(request, response) {
    const { categoryid } = request.headers;

    let rooms = null;

    switch (categoryid) {
      case "10":
        rooms = await RoomModel.find();
        if (rooms) return response.json({ rooms, loading: false }); // Filtra todas os projetos ao selecionar Categoria = "Todas"
        break;
      case "11":
        rooms = await RoomModel.find({ categoryId: null }); // Filtra todas os projetos que possuem Categoria = "Outros"
        if (rooms) return response.json({ rooms, loading: false });
        break;
      default: // Filtra projetos por Categoria
        rooms = await RoomModel.find({ categoryId: categoryid });
        if (rooms) return response.json({ rooms, loading: false });
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
      const {
        roomTitle,
        roomCategory,
        subCategories,
        roomDescription,
        newCategory,
        _id,
      } = request.body;

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
          subCategories,
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
            message: "Erro ao Excluir Projeto.",
          });
        } else {
          response.json({
            message: "Projeto Excluído com Sucesso.",
            status: 200,
          });
        }
      });
    }
  },
};
