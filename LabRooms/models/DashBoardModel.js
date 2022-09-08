const { model, Schema } = require("mongoose");

const DashBoardModel = new Schema({
  dashBoardOwner: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

module.exports = model("DashBoard", DashBoardModel);
