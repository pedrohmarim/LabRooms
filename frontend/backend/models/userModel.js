const { model, Schema } = require("mongoose");

const UserModel = new Schema(
  {
    accountType: {
      type: Number,
      required: true,
    },
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
    phone: {
      type: String,
      required: false,
    },
    celphone: {
      type: String,
      required: false,
    },
    biography: {
      type: String,
      required: false,
    },
    socials: {
      facebook: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
      linkedin: {
        type: String,
        required: false,
      },
      github: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("users", UserModel); // oq está em string é o nome da Tabela que vai ser criada armazenando o DTO de segundo parametro
