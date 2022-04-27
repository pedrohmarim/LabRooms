const CandidaciesModel = require("../models/CandidaciesModel");

module.exports = {
  async handleApply(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { roomId, userIdToApply, owner } = request.body;

      const alreadyApplied = await CandidaciesModel.findOne({ userIdToApply });

      if (alreadyApplied)
        return response.json({
          message: "Você Já se Candidatou a esta Vaga.",
          success: false,
        });

      CandidaciesModel.create({
        roomId,
        userIdToApply,
        owner,
      })
        .then(() => {
          return response.json({
            message: "Candidatura Cadastrada com Sucesso.",
            success: true,
          });
        })
        .catch(() => {
          return response.json({
            message: "Erro ao Cadastrar Candidatura.",
          });
        });
    }
  },
};
