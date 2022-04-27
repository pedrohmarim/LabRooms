const { model, Schema } = require("mongoose");

const CandidaciesModel = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    userIdToApply: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("candidacies", CandidaciesModel);
