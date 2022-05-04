const CandidaciesModel = require("../models/CandidaciesModel");
const CategoriesModel = require("../models/CategoriesModel");
const UserModel = require("../models/UserModel");
const VerifyCaptcha = require("../Helpers/VerifyCaptcha");

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
                candidacieId: user?._id,
                userId: _id,
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
            candidacieId: user?._id,
            userId: _id,
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
      const { roomId, userIdToApply, owner, loggedAccountType, captcha } =
        request.body;

      const validCaptcha = await VerifyCaptcha(captcha);

      if (!validCaptcha)
        return response.status(500).json({
          message: "Captcha Inválido",
        });

      if (loggedAccountType === 2)
        return response.json({
          message: "Não Autorizado.",
          success: false,
        });

      const alreadyApplied = await CandidaciesModel.findOne({
        $and: [{ userIdToApply }, { roomId }],
      });

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

  async handleDeleteCandidacieById(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { _id } = request.headers;

      CandidaciesModel.findByIdAndRemove(
        { _id },
        { new: true },
        function (err) {
          if (err) {
            return response.json({
              message: "Erro ao Excluir Candidato.",
            });
          } else {
            response.json({
              message: "Candidato Excluído com Sucesso.",
              success: true,
            });
          }
        }
      );
    }
  },
};
