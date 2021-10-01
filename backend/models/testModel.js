const { model, Schema } = require("mongoose");

const testCase = new Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
});

module.exports = model("testCase", testCase); // oq está em string é o nome da Tabela que vai ser criada armazenando o DTO de segundo parametro
