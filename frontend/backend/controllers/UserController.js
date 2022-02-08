const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async handleRegister(request, response) {
    const { cpf, email, password, username } = request.body;

    UserModel.find({ cpf }).then(async (res) => {
      if (res.length === 0) {
        let hashedPass = await bcrypt.hash(password, 10);

        UserModel.create({
          cpf,
          email,
          hashedPass,
          username,
          createdAt: new Date(),
        })
          .then(() => {
            return response.json({
              message: "Usuário cadastrado com sucesso!",
              success: true,
              unknow: false,
            });
          })
          .catch(() => {
            return response.json({
              message: "Erro ao cadastrar usuário.",
              unknow: true,
            });
          });
      } else {
        return response.json({
          message: "CPF já cadastrado!",
          success: false,
          unknow: false,
        });
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

       const token = jwt.sign({
          _id
        }, process.env.JWT_KEY,
        {
          expiresIn: "1h"
        });

        return response.json({ token, message: "Logado com sucesso!" });
      } else {
        return response.json({ _id: null });
      }
    } else {
      return response.json({ _id: null });
    }
  },

  async handleGetCurrentUser(request, response) {
    const { _id } =  request.body.decoded;

    var user = await UserModel.findOne({
      _id,
    });

    if (user) {
      return response.json({
        username: user.username,
        email: user.email,
        cpf: user.cpf,
        createdAt: user.createdAt.toLocaleString("pt-BR"),
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
        username: user.username,
      });
    } else {
      return response.json(null);
    }
  },
};
