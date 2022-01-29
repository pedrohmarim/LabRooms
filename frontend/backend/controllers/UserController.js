const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  async handleRegister(request, response) {
    const { cpf, email, password, username } = request.body;

    userModel.find({ cpf: cpf }).then(async (res) => {
      console.log("resposta", res);
      if (res.length === 0) {
        let hashedPass = await bcrypt.hash(password, 10);

        userModel
          .create({
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
    var user = await userModel.findOne({
      email: request.headers["email"],
    });

    if (user) {
      const validPassword = await bcrypt.compare(
        request.headers["password"],
        user.hashedPass
      );

      if (validPassword) {
        const { _id } = user;

        return response.json({ _id, message: "Logado com sucesso!" });
      } else {
        return response.json({ _id: null });
      }
    } else {
      return response.json({ _id: null });
    }
  },
};
