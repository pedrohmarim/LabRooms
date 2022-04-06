const { model, Schema } = require("mongoose");

const CategoryModel = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Icon: {
    type: String,
    required: true,
  },
  SubCategories: {
    type: Array,
    required: true,
  },
});

module.exports = model("Categories", CategoryModel); // oq está em string é o nome da Tabela que vai ser criada armazenando o DTO de segundo parametro
