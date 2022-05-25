module.exports = async (rooms, users, recomendedRooms = false) => {
  const arrayScore = [];

  rooms.forEach(async (room) => {
    users.forEach((user) => {
      if (user?.categoryId === room?.categoryId) {
        let subCategoriesScore;
        let priceScore;
        let itemScore;
        let totalSubMatches;

        if (room?.hourprice > user?.hourprice)
          priceScore = Number(
            ((user?.hourprice * 100) / room?.hourprice).toFixed(1)
          );
        else
          priceScore = Number(
            ((room?.hourprice * 100) / user?.hourprice).toFixed(1)
          );

        let roomSubCategories = JSON.parse(JSON.stringify(room?.subCategories));
        let userSubCategories = JSON.parse(JSON.stringify(user?.subCategories));

        let subCategoriesMatch = roomSubCategories.filter((sub) =>
          userSubCategories.includes(sub)
        );

        subCategoriesScore =
          room?.newCategory && user?.newCategory
            ? 100
            : Number(
                (
                  (subCategoriesMatch.length * 100) /
                  roomSubCategories.length
                ).toFixed(1)
              );

        totalSubMatches = `${subCategoriesMatch.length}/${
          !recomendedRooms ? roomSubCategories.length : userSubCategories.length
        }`;

        itemScore = ((subCategoriesScore + priceScore) / 2).toFixed(1);

        if (itemScore < 50) return;

        let multipleRecomendation = arrayScore.find(
          (x) => x._id.toString() === user?._id.toString()
        );

        if (!recomendedRooms) {
          if (!multipleRecomendation) {
            arrayScore.push({
              ...user?._doc,
              scoreTabs: [
                {
                  itemScore,
                  totalSubMatches,
                  priceScore,
                  roomPrice: room?.hourprice,
                  roomTitle: room?.title,
                  roomId: room?._id,
                },
              ],
            });
          } else {
            multipleRecomendation.scoreTabs.push({
              itemScore,
              totalSubMatches,
              priceScore,
              roomPrice: room?.hourprice,
              roomTitle: room?.title,
              roomId: room?._id,
            });
          }
        } else
          arrayScore.push({
            ...room?._doc,
            itemScore,
            totalSubMatches,
            priceScore,
            userPrice: user?.hourprice,
          });
      }
    });
  });

  return arrayScore;
};
