const AnonymizeCPF = require("../Anonymize/AnonymizeCPF");
const AnonymizeEmail = require("../Anonymize/AnonymizeEmail");
const UserModel = require("../models/UserModel");
const RoomsModel = require("../models/RoomModel");
const CategoriesModel = require("../models/CategoriesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VerifyCaptcha = require("../Helpers/VerifyCaptcha");

function handleUsersWithIcon(users, response) {
  let usersWithIcon = [];

  users.forEach((user) => {
    const {
      _id,
      categoryId,
      newCategory,
      username,
      biography,
      accountType,
      imagePath,
    } = user;

    if (categoryId) {
      CategoriesModel.findOne({ _id: categoryId }).then(({ Icon, Title }) => {
        usersWithIcon.push({
          _id,
          username,
          imagePath,
          biography,
          accountType,
          Icon,
          CategorieTitle: Title,
        });

        if (users.length === usersWithIcon.length)
          return response.json({ usersWithIcon, loading: false });
      });
    } else if (newCategory) {
      usersWithIcon.push({
        _id,
        username,
        imagePath,
        biography,
        accountType,
        Icon: "repeat",
        CategorieTitle: newCategory,
      });

      if (users.length === usersWithIcon.length)
        return response.json({ usersWithIcon, loading: false });
    }
  });
}

module.exports = {
  async handleRegister(request, response) {
    const {
      cpf,
      email,
      password,
      username,
      accountType,
      subCategories,
      categoryId,
      newCategory,
      captcha,
    } = request.body;

    const validCaptcha = await VerifyCaptcha(captcha);

    if (!validCaptcha)
      return response.status(500).json({
        message: "Captcha Inválido",
      });

    UserModel.find({ $or: [{ cpf }, { email }] }).then(async (res) => {
      if (res.length === 0) {
        let hashedPass = await bcrypt.hash(password, 10);

        if (accountType === "1") {
          UserModel.create({
            cpf,
            email,
            hashedPass,
            username,
            accountType,
            subCategories,
            categoryId: categoryId === "undefined" ? undefined : categoryId,
            newCategory: newCategory === "undefined" ? undefined : newCategory,
            imagePath: request.file.path,
            createdAt: new Date().setHours(new Date().getHours() - 3),
          })
            .then(() => {
              return response.json({
                message: "Usuário Cadastrado.",
                success: true,
              });
            })
            .catch(() => {
              return response.json({
                message: "Erro ao Cadastrar Usuário.",
              });
            });
        } else {
          UserModel.create({
            cpf,
            email,
            hashedPass,
            username,
            accountType,
            imagePath: request.file.path,
            createdAt: new Date().setHours(new Date().getHours() - 3),
          })
            .then(() => {
              return response.json({
                message: "Usuário Cadastrado.",
                success: true,
              });
            })
            .catch(() => {
              return response.json({
                message: "Erro ao cadastrar usuário.",
              });
            });
        }
      } else {
        if (res[0].email === email) {
          return response.json({
            message: "E-mail já cadastrado.",
            field: "email",
          });
        }

        if (res[0].cpf === cpf) {
          return response.json({
            message: "CPF já cadastrado.",
            field: "cpf",
          });
        }
      }
    });
  },

  async handleLogin(request, response) {
    var user = await UserModel.findOne({
      email: request.headers["email"],
    });

    if (user) {
      const validPassword = await bcrypt.compare(
        request.headers["password"],
        user.hashedPass
      );

      if (validPassword) {
        const { _id } = user;

        const token = jwt.sign(
          {
            _id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        return response.json({ token, message: "Logado com Sucesso." });
      } else {
        return response.json({ _id: null });
      }
    } else {
      return response.json({ _id: null });
    }
  },

  async handleGetUsers(request, response) {
    const { _id } = request.headers;

    var users = [];

    if (_id !== "undefined")
      users = await UserModel.find({
        $and: [{ _id: { $ne: _id } }, { accountType: 1 }],
      });
    else users = await UserModel.find({ accountType: 1 });

    if (users.length > 0) {
      handleUsersWithIcon(users, response);
    } else {
      return response.json({
        usersWithIcon: users,
        loading: false,
      });
    }
  },

  async handleGetRecomendedUsers(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { owner } = request.headers;

      let ownerRooms = await RoomsModel.find({ owner });

      let categories = [];

      ownerRooms.forEach((room) => {
        const { categoryId } = room;
        categories.push(categoryId);
      });

      var recomendedUsers = await UserModel.find({
        categoryId: { $in: categories },
        $and: [{ accountType: 1 }],
      });

      if (recomendedUsers.length > 0) {
        handleUsersWithIcon(recomendedUsers, response);
      } else {
        return response.json({
          arrayWithIcon: recomendedUsers,
          loading: false,
        });
      }
    }
  },

  async handleGetCurrentUser(request, response) {
    const { _id } = request.body.decoded;

    var user = await UserModel.findOne({
      _id,
    });

    if (user) {
      return response.json({
        ...user._doc,
        hashedPass: undefined,
        createdAt: user.createdAt.toLocaleString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      });
    } else {
      return response.json(null);
    }
  },

  async handleGetUserById(request, response) {
    const { _id } = request.headers;

    const user = await UserModel.findOne({ _id });

    if (user) {
      return response.json({
        ...user._doc,
        cpf: AnonymizeCPF(user?.cpf),
        email: AnonymizeEmail(user?.email),
        hashedPass: undefined,
        createdAt: user.createdAt.toLocaleString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      });
    } else {
      return response.json(null);
    }
  },

  async handleGetUsersByCategory(request, response) {
    const { categoryid, _id } = request.headers;

    var users = null;

    switch (categoryid) {
      case "10":
        if (_id !== "undefined")
          users = await UserModel.find({
            $and: [{ _id: { $ne: _id } }, { accountType: 1 }],
          });
        else users = await UserModel.find({ accountType: 1 });
        break;
      case "11":
        users = await UserModel.find({
          $and: [{ categoryId: null }, { accountType: 1 }],
        });
        break;
      default: // Filtra projetos por Categoria
        users = await UserModel.find({ categoryId: categoryid });
        break;
    }

    if (users.length > 0) handleUsersWithIcon(users, response);
    else return response.json({ usersWithIcon: [], loading: false });
  },

  async handleUpdateUser(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const {
        username,
        email,
        cpf,
        phone,
        celphone,
        biography,
        socials,
        categoryId,
        newCategory,
        subCategories,
      } = request.body;

      const usersSameEmail = await UserModel.findOne({ email });

      if (usersSameEmail && usersSameEmail._id.toString() !== _id) {
        return response.json({
          message: "E-mail já cadastrado.",
          field: "email",
        });
      }

      const usersSameCpf = await UserModel.findOne({ cpf });

      if (usersSameCpf && usersSameCpf._id.toString() !== _id) {
        return response.json({
          message: "CPF já cadastrado.",
          field: "cpf",
        });
      }

      RoomsModel.updateMany(
        { owner: _id },
        { ownerName: username },
        { new: true },
        function (err) {
          if (err) {
            return response.json({
              message: "Erro ao atualizar informações.",
            });
          } else {
            UserModel.findByIdAndUpdate(
              { _id },
              {
                username,
                email,
                cpf,
                phone,
                celphone,
                biography,
                socials,
                categoryId:
                  categoryId === 11 || categoryId === 12 ? null : categoryId,
                newCategory:
                  categoryId && categoryId !== 11 && categoryId !== 12
                    ? null
                    : newCategory,
                subCategories: newCategory ? null : subCategories,
              },
              { new: true },
              function (err, data) {
                if (err) {
                  return response.json({
                    message: "Erro ao atualizar informações.",
                  });
                } else {
                  response.json({
                    updatedUser: {
                      ...data._doc,
                      createdAt: data.createdAt.toLocaleString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }),
                    },
                    message: "Informações atualizadas com sucesso.",
                    status: 200,
                  });
                }
              }
            );
          }
        }
      );
    }
  },
};
