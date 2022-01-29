const { model, Schema } = require("mongoose");

const userModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = model("usuarios", userModel); // oq está em string é o nome da Tabela que vai ser criada armazenando o DTO de segundo parametro