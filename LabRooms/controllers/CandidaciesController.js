const CandidaciesModel = require("../models/CandidaciesModel");
const CategoriesModel = require("../models/CategoriesModel");
const UserModel = require("../models/UserModel");
const DashBoardModel = require("../models/DashBoardModel");
const VerifyCaptcha = require("../Helpers/VerifyCaptcha");

function returnFormattedCandidacies(candidacies, response) {
  let formattedCandidacies = [];

  candidacies.forEach((user) => {
    const { userIdToApply, roomId } = user;

    UserModel.findOne({ _id: userIdToApply }).then(
      ({ username, _id, email, categoryId, newCategory }) => {
        if (categoryId) {
          CategoriesModel.findOne({ _id: categoryId }).then(
            ({ Icon, Title }) => {
              formattedCandidacies.push({
                key: _id,
                username,
                email,
                skill: {
                  Icon,
                  CategorieTitle: Title,
                },
                roomId,
              });

              if (candidacies.length === formattedCandidacies.length)
                return response.json({ formattedCandidacies, loading: false });
            }
          );
        } else if (newCategory) {
          formattedCandidacies.push({
            key: _id,
            username,
            email,
            skill: {
              Icon: "repeat",
              CategorieTitle: newCategory,
            },
            roomId,
          });

          if (candidacies.length === formattedCandidacies.length)
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

      const candidacies = await CandidaciesModel.find({ roomId: roomid });

      if (candidacies.length > 0) {
        returnFormattedCandidacies(candidacies, response);
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

      CandidaciesModel.deleteOne({ userIdToApply: _id })
        .then(() =>
          response.json({
            message: "Candidato Excluído com Sucesso.",
            success: true,
          })
        )
        .catch(() =>
          response.json({
            message: "Erro ao Excluir Candidato.",
          })
        );
    }
  },

  async handleVerifyApply(request, response) {
    const { _id, roomid } = request.headers;

    try {
      const result = await CandidaciesModel.findOne({
        $and: [{ userIdToApply: _id }, { roomId: roomid }],
      });

      if (result) return response.json({ applied: true });

      return response.json({ applied: false });
    } catch {
      return response.json({ applied: false });
    }
  },

  async handleDashboardUsers(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { usersids, roomid } = request.headers;

      if (usersids === "null" || usersids === "undefined") {
        DashBoardModel.findOne({
          roomId: roomid,
        })
          .then(({ columns, roomId, _id }) => {
            if (_id) {
              return response.json({
                columns,
                roomId,
                _id,
              });
            }
          })
          .catch(() => response.json());
      } else {
        const result = await UserModel.find({
          _id: { $in: usersids.split(",") },
        });

        const dashboardUsers = [];
        const cards = [];

        result.forEach(({ _id, username, categoryId, newCategory }) => {
          if (categoryId) {
            CategoriesModel.findOne({ _id: categoryId }).then(
              ({ Icon, Title }) => {
                cards.push({
                  id: _id,
                  title: username,
                  icon: Icon,
                  category: Title,
                });
              }
            );
          } else if (newCategory) {
            cards.push({
              id: _id,
              title: username,
              icon: "repeat",
              category: newCategory,
            });
          }
        });

        dashboardUsers.push(
          {
            id: "first_column",
            title: "Candidatos",
            cards,
          },
          {
            id: "second_column",
            title: "Fase Inicial",
            cards: [],
          },
          {
            id: "third_column",
            title: "Fase do meio",
            cards: [],
          },
          {
            id: "fourth_column",
            title: "Fase final",
            cards: [],
          }
        );

        DashBoardModel.create({
          roomId: roomid,
          columns: dashboardUsers,
        }).then((doc) =>
          response.json({
            columns: doc.columns,
            _id: doc._id,
            roomId: doc.roomId,
          })
        );
      }
    }
  },

  async updateDashboardUsers(request, response) {
    const { _id } = request.body.decoded;

    if (_id) {
      const { updatedDashBoard } = request.body;

      DashBoardModel.findByIdAndUpdate(
        { _id: updatedDashBoard._id },
        { columns: updatedDashBoard.columns },
        { new: true },
        function (err) {
          if (err) {
            return response.json({
              message: "Erro ao atualizar informações.",
            });
          } else {
            response.json({
              message: "Informações atualizadas com sucesso.",
              status: 200,
            });
          }
        }
      );
    }
  },
};
