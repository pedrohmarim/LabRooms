const RoomModel = require("../models/RoomModel");
const UserModel = require("../models/UserModel");
const CategoriesModel = require("../models/CategoriesModel");
const VerifyCaptcha = require("../Helpers/VerifyCaptcha");
const CreateToken = require("../Helpers/CreateToken");
const jwt = require("jsonwebtoken");

function handleRoomWithIcon(array, response) {
  let arrayWithIcon = [];

  array.forEach((item) => {
    const {
      categoryId,
      newCategory,
      subCategories,
      ownerName,
      title,
      _id,
      description,
      visible,
      imagePath,
    } = item;

    if (categoryId) {
      CategoriesModel.findOne({ _id: categoryId }).then(({ Icon, Title }) => {
        arrayWithIcon.push({
          visible,
          description,
          categoryId,
          _id,
          title,
          ownerName,
          subCategories,
          Icon,
          CategorieTitle: Title,
          imagePath,
        });

        if (array.length === arrayWithIcon.length)
          return response.json({ arrayWithIcon, loading: false });
      });
    } else if (newCategory) {
      arrayWithIcon.push({
        visible,
        description,
        newCategory,
        _id,
        title,
        ownerName,
        subCategories,
        Icon: "repeat",
        CategorieTitle: newCategory,
        imagePath,
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
    if (user?.accountType === 1)
      return response.status(403).json({
        message: "Não Autorizado.",
      });

    let {
      title,
      description,
      categoryId,
      newCategory,
      ownerName,
      subCategories,
      visible,
      captcha,
      imagePath,
    } = request.body;

    const validCaptcha = await VerifyCaptcha(captcha);

    if (!validCaptcha)
      return response.status(500).json({
        message: "Captcha Inválido",
      });

    RoomModel.create({
      title,
      description,
      categoryId,
      imagePath,
      subCategories,
      newCategory,
      owner: _id,
      ownerName,
      visible,
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
    const rooms = await RoomModel.find({ visible: true });

    if (rooms.length > 0) {
      handleRoomWithIcon(rooms, response);
    } else {
      return response.json({
        arrayWithIcon: rooms,
        loading: false,
      });
    }
  },

  async handleGetRoomsByOwnerId(request, response) {
    const { owner } = request.headers;

    const rooms = await RoomModel.find({ owner: owner });

    if (rooms.length > 0) {
      handleRoomWithIcon(rooms, response);
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

      var recomendedRooms = null;

      if (categoryid !== "null") {
        recomendedRooms = await RoomModel.find({
          $and: [{ categoryId: categoryid }, { visible: true }],
        });
      } else {
        recomendedRooms = await RoomModel.find({
          $and: [{ categoryId: null }, { visible: true }],
        });
      }

      if (recomendedRooms.length > 0) {
        handleRoomWithIcon(recomendedRooms, response);
      } else {
        return response.json({
          arrayWithIcon: recomendedRooms,
          loading: false,
        });
      }
    }
  },

  async handleGetRoomsByCategory(request, response) {
    const { categoryid } = request.headers;

    let rooms = null;

    switch (categoryid) {
      case "10":
        rooms = await RoomModel.find({ visible: true }); // Filtra todas os projetos ao selecionar Categoria = "Todas"
        break;
      case "11":
        rooms = await RoomModel.find({
          $and: [{ categoryId: null }, { visible: true }],
        }); // Filtra todas os projetos que possuem Categoria = "Outros"
        break;
      default: // Filtra projetos por Categoria
        rooms = await RoomModel.find({
          $and: [{ categoryId: categoryid }, { visible: true }],
        });
        break;
    }

    if (rooms.length > 0) handleRoomWithIcon(rooms, response);
    else return response.json({ arrayWithIcon: [], loading: false });
  },

  async handleGetRoomsById(request, response) {
    const { _id } = request.headers;

    try {
      const result = await RoomModel.findOne({ _id });
      return response.json(result);
    } catch {
      return response.json(null);
    }
  },

  async handleUpdateRoom(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const {
        title,
        categoryId,
        subCategories,
        description,
        newCategory,
        _id,
      } = request.body;

      RoomModel.findByIdAndUpdate(
        { _id },
        {
          title,
          description,
          categoryId:
            categoryId === 11 || categoryId === 12 ? null : categoryId, //11 = categoria "outras"
          newCategory:
            categoryId && categoryId !== 11 && categoryId !== 12
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

  handleLockProject(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { visible, _id } = request.body;

      RoomModel.findByIdAndUpdate(
        { _id },
        { visible },
        { new: true },
        function (err) {
          if (err) {
            return response.json({
              message: "Erro ao Privar Sala.",
            });
          } else {
            response.json({
              message: `Sala ${
                !visible ? "Privada" : "Desprivada"
              } com Sucesso.`,
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

  async handleCreateSharedLink(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { _id } = request.body;

      const tokenName = `JWT_KEY_SHAREROOM_${_id}`;

      const token = await CreateToken(_id, tokenName, "12h");

      const inviteLink = `${request.headers.origin}/view/project/${_id}?token=${token}`;

      return response.json({
        status: 200,
        inviteLink,
        message: "URL Copiada.",
        description: "Após 12h o Link Irá Expirar.",
      });
    }
  },

  async handleValidateSharedLink(request, response) {
    const { urltoken, _id } = request.headers;

    try {
      const decoded = jwt.verify(
        urltoken,
        `process.env.JWT_KEY_SHAREROOM_${_id}`
      );

      if (decoded) {
        const { _id } = decoded;

        return response.json({
          status: 200,
          _id,
        });
      }
    } catch {
      return response.json({
        _id: undefined,
      });
    }
  },
};
