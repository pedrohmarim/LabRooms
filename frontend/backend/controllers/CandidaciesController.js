const CandidaciesModel = require("../models/CandidaciesModel");
const CategoriesModel = require("../models/CategoriesModel");
const UserModel = require("../models/UserModel");

function returnFormattedCandidacies(usersApplied, response) {
  let formattedCandidacies = [];

  usersApplied.forEach((user) => {
    const { userIdToApply } = user;

    UserModel.findOne({ _id: userIdToApply }).then(
      ({ username, _id, email, categoryId, newCategory }) => {
        if (categoryId) {
          CategoriesModel.findOne({ _id: categoryId }).then(
            ({ Icon, Title }) => {
              formattedCandidacies.push({
                _id,
                username,
                email,
                skill: {
                  Icon,
                  Title,
                },
              });

              if (usersApplied.length === formattedCandidacies.length)
                return response.json({ formattedCandidacies, loading: false });
            }
          );
        } else if (newCategory) {
          formattedCandidacies.push({
            _id,
            username,
            email,
            skill: {
              Icon: "repeat",
              CategorieTitle: newCategory,
            },
          });

          if (usersApplied.length === formattedCandidacies.length)
            return response.json({ formattedCandidacies, loading: false });
        }
      }
    );
  });
}

module.exports = {
  async handleApply(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { roomId, userIdToApply, owner, loggedAccountType } = request.body;

      if (loggedAccountType === 2)
        return response.json({
          message: "Não Autorizado.",
          success: false,
        });

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

  async handleGetCandidaciesByRoomId(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { roomid } = request.headers;

      const usersApplied = await CandidaciesModel.find({ roomId: roomid });

      if (usersApplied.length > 0) {
        returnFormattedCandidacies(usersApplied, response);
      } else {
        return response.json({
          errorMessage: "Ainda não Há Candidaturas para este Projeto.",
          loading: false,
        });
      }
    }
  },
};
