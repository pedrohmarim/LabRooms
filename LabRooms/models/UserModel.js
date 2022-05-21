const { model, Schema } = require("mongoose");

const UserModel = new Schema(
  {
    accountType: {
      type: Number,
      required: true,
      default: undefined,
    },
    categoryId: {
      type: String,
      required: false,
    },
    newCategory: {
      type: String,
      required: false,
      default: undefined,
    },
    subCategories: {
      type: Array,
      required: false,
      default: undefined,
    },
    username: {
      type: String,
      required: true,
      default: undefined,
    },
    hourprice: {
      type: Number,
      required: true,
      default: undefined,
    },
    email: {
      type: String,
      required: true,
      default: undefined,
    },
    imagePath: {
      type: String,
      required: false,
      default: undefined,
    },
    cpf: {
      type: String,
      required: false,
      default: undefined,
    },
    cnpj: {
      type: String,
      required: false,
      default: undefined,
    },
    hashedPass: {
      type: String,
      required: true,
      default: undefined,
    },
    phone: {
      type: String,
      required: false,
      default: undefined,
    },
    celphone: {
      type: String,
      required: false,
      default: undefined,
    },
    biography: {
      type: String,
      required: false,
      default: undefined,
    },
    socials: {
      facebook: {
        type: String,
        required: false,
        default: undefined,
      },
      instagram: {
        type: String,
        required: false,
        default: undefined,
      },
      twitter: {
        type: String,
        required: false,
        default: undefined,
      },
      linkedin: {
        type: String,
        required: false,
        default: undefined,
      },
      github: {
        type: String,
        required: false,
        default: undefined,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("users", UserModel);
