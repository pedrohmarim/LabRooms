const CandidaciesModel = require("../models/CandidaciesModel");

module.exports = {
  async handleApply(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { roomId, userIdToApply } = request.body;
    }
  },
};
