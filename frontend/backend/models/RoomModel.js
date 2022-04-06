const { model, Schema } = require("mongoose");

const RoomModel = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: false,
    },
    newCategory: {
      type: String,
      required: false,
    },
    thumb: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("rooms", RoomModel); // oq está em string é o nome da Tabela que vai ser criada armazenando o DTO de segundo parametro
