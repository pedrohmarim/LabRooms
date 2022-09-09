const { model, Schema } = require("mongoose");

const DashBoardModel = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

module.exports = model("DashBoard", DashBoardModel);
