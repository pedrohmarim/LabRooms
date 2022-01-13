const testModel = require("../models/testModel");

module.exports = {
  async test(request, response) {
    const { nome, sobrenome } = request.body;
    console.log('chegou');

    testModel
      .create({
        nome,
        sobrenome,
      })
      .then(() => {
        return response.json({ message: "Foi pro bd!!" });
      })
      .catch((err) => {
        return response.json({ message: `deu erro: ${err}` });
      });
  },
};
