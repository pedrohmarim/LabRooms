const userModel = require("../models/userModel");

module.exports = {
  async handleRegister(request, response) {
    const { cpf, email, password, username } = request.body;

    userModel.find({ cpf: cpf }).then((res) => {
      if (res.length === 0) {
        userModel
          .create({
            cpf,
            email,
            password,
            username,
            createdAt: new Date(),
          })

          .then(() => {
            return response.json({
              message: "Usuário cadastrado com sucesso!",
              success: true,
            });
          })
          .catch(() => {
            return response.json({
              message: "Erro ao cadastrar usuário.",
              success: false,
            });
          });
      } else {
        return response.json({ message: "CPF já cadastrado!", success: false });
      }
    });
  },
};
