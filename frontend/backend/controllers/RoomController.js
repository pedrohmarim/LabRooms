const RoomModel = require("../models/RoomModel");
const UserModel = require("../models/userModel");
const CategoriesModel = require("../models/CategoriesModel");

function handleRoomWithIcon(array, response) {
  let arrayWithIcon = [];

    array.forEach((room) => {
      const { categoryId, newCategory } = room;

      if (categoryId) {
        CategoriesModel.findOne({ _id: categoryId }).then(
          ({ Icon, Title }) => {
            arrayWithIcon.push({ ...room._doc, Icon, CategorieTitle: Title });

            if (array.length === arrayWithIcon.length)
              return response.json({ arrayWithIcon, loading: false });
          }
        );
      } else if (newCategory) {
        arrayWithIcon.push({
          ...room._doc,
          Icon: "repeat",
          CategorieTitle: newCategory,
        });

        if (array.length === arrayWithIcon.length)
          return response.json({ arrayWithIcon, loading: false });
      }
    });
}

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
    handleRoomWithIcon(rooms, response)
  },

  async handleGetRoomsByOwnerId(request, response) {
    const { owner } = request.headers;

    const rooms = await RoomModel.find({ owner: owner });

    if (rooms.length > 0) {
      handleRoomWithIcon(rooms, response)
    } else {
      return response.json({
        errorMessage: "Nenhum Projeto Encontrado.",
        loading: false,
      });
    }
  },

  async handleGetRecomendedRooms(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { categoryid } = request.headers;

      var recomendedRooms = await RoomModel.find({
        $or: [{ categoryId: categoryid }],
      });

      handleRoomWithIcon(recomendedRooms, response)
    }
  },

  async handleGetRecomendedUsers(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { owner } = request.headers;

      let ownerRooms = await RoomModel.find({ owner });

      let categories = [];

      ownerRooms.forEach((room) => {
        const { categoryId } = room;
        categories.push(categoryId);
      });

      var recomendedUsers = await UserModel.find({
        categoryId: { $in: categories },
        $and: [{ accountType: 1 }],
      })

      handleRoomWithIcon(recomendedUsers, response)
    }
  },

  async handleGetRoomsByCategory(request, response) {
    const { categoryid } = request.headers;

    let rooms = null;

    switch (categoryid) {
      case "10":
        rooms = await RoomModel.find(); // Filtra todas os projetos ao selecionar Categoria = "Todas"
        break;
      case "11":
        rooms = await RoomModel.find({ categoryId: null }); // Filtra todas os projetos que possuem Categoria = "Outros"
        break;
      default: // Filtra projetos por Categoria
        rooms = await RoomModel.find({ categoryId: categoryid });
        break;
    }

    if (rooms.length > 0) handleRoomWithIcon(rooms, response)
    else return response.json({ usersWithIcon: [], loading: false });
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
