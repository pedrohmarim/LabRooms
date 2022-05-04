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
    subCategories: {
      type: Array,
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
    visible: {
      type: Object,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("rooms", RoomModel);
