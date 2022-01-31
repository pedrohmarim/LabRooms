const { model, Schema } = require("mongoose");

const UserModel = new Schema({
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
  hashedPass: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = model("users", UserModel); // oq está em string é o nome da Tabela que vai ser criada armazenando o DTO de segundo parametro
