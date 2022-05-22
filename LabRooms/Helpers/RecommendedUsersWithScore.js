module.exports = async (ownerRooms, recomendedUsers) => {
    const usersWithScore = []

    ownerRooms.forEach(async room => {
        recomendedUsers.forEach(user => {
            let subCategoriesScore;
            let priceScore;
            var priceRange = user?.hourprice * 0.2;

            //aq
            priceScore = ((user?.hourprice - priceRange) <= room?.hourprice) && ((user?.hourprice + priceRange) >= room?.hourprice) ? 100 : 0

            if ((user?.categoryId === room?.categoryId)) {
                let roomSubCategories = JSON.parse(JSON.stringify(room?.subCategories)); 
                let userSubCategories = JSON.parse(JSON.stringify(user?.subCategories)); 

                let subCategoriesMatch = roomSubCategories.filter(sub => userSubCategories.includes(sub))

                subCategoriesScore = Number(((subCategoriesMatch.length * 100)/roomSubCategories.length).toFixed(1));
                
                usersWithScore.push({...user?._doc, subCategoriesScore, priceScore})
            } else if (room?.newCategory && user?.newCategory) {
                subCategoriesScore = 100;
                usersWithScore.push({...user?._doc, subCategoriesScore: 100, priceScore})
            }
        });
    });
    
    return usersWithScore;
};
