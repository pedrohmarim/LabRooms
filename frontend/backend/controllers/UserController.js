const UserModel = require("../models/userModel");
const RoomsModel = require("../models/RoomModel");
const CategoriesModel = require("../models/CategoriesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    } = request.body;

    UserModel.find({ $or: [{ cpf }, { email }] }).then(async (res) => {
      if (res.length === 0) {
        let hashedPass = await bcrypt.hash(password, 10);


        if(accountType === 1) {
          UserModel.create({
            cpf,
            email,
            hashedPass,
            username,
            accountType,
            subCategories,
            categoryId,
            newCategory,
            createdAt: new Date().setHours(new Date().getHours() - 3),
          }).then(() => {
            return response.json({
              message: "Usuário cadastrado.",
              success: true,
            });
          })
          .catch(() => {
            return response.json({
              message: "Erro ao cadastrar usuário.",
              unknow: true,
            });
          });
        } else {
          UserModel.create({
            cpf,
            email,
            hashedPass,
            username,
            accountType,
            createdAt: new Date().setHours(new Date().getHours() - 3),
          }).then(() => {
            return response.json({
              message: "Usuário cadastrado.",
              success: true,
            });
          })
          .catch(() => {
            return response.json({
              message: "Erro ao cadastrar usuário.",
              unknow: true,
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

        return response.json({ token, message: "Logado com sucesso." });
      } else {
        return response.json({ _id: null });
      }
    } else {
      return response.json({ _id: null });
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

  async handleGetRoomsByOwnerId(request, response) {
    const { owner } = request.headers;

    const rooms = await RoomsModel.find({ owner: owner });

    if (rooms.length > 0) {
      let roomWithIcon = [];

      rooms.forEach((room) => {
        const { categoryId, newCategory } = room;

        if (categoryId) {
          CategoriesModel.findOne({ _id: categoryId }).then(
            ({ Icon, Title }) => {
              roomWithIcon.push({ ...room._doc, Icon, CategorieTitle: Title });

              if (rooms.length === roomWithIcon.length)
                return response.json({ roomWithIcon, loading: false });
            }
          );
        } else if (newCategory) {
          roomWithIcon.push({
            ...room._doc,
            Icon: "repeat",
            CategorieTitle: newCategory,
          });

          if (rooms.length === roomWithIcon.length)
            return response.json({ roomWithIcon, loading: false });
        }
      });
    } else {
      return response.json({
        errorMessage: "Nenhum Projeto Encontrado.",
        loading: false,
      });
    }
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
       
       const usersSameEmail = await UserModel.findOne({ email })
       
       if (usersSameEmail && usersSameEmail._id.toString() !== _id) {
        return response.json({
          message: "E-mail já cadastrado.",
          field: "email",
        });
      } 
      
      const usersSameCpf = await UserModel.findOne({ cpf })  
      
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
                categoryId: categoryId === 11 || categoryId === 12 ? undefined : categoryId,
                newCategory: categoryId && categoryId !== 11 && categoryId !== 12 ? undefined : newCategory,
                subCategories: newCategory ? undefined : subCategories,
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
