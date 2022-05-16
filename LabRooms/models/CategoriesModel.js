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

module.exports = model("Categories", CategoryModel);
