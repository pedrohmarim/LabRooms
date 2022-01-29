const userModel = require("../models/userModel");

module.exports = {
  async handleLogin(request, response) {
    var user = await userModel.findOne({
      email: request.headers["email"],
      password: request.headers["password"],
    });

    return response.json({ user, message: "Logado com sucesso!" });
  },
};
