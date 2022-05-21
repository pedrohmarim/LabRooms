module.exports = async (ownerRooms, recomendedUsers) => {
    const usersWithScore = []

    ownerRooms.forEach(async room => {
        recomendedUsers.forEach(user => {
           if ((user?.categoryId === room?.categoryId)) {
                let roomSubCategories = JSON.parse(JSON.stringify(room?.subCategories)); 
                let userSubCategories = JSON.parse(JSON.stringify(user?.subCategories)); 
                let subCategoriesMatch = roomSubCategories.filter(sub => userSubCategories.includes(sub))
                let subCategoriesScore = Number(((subCategoriesMatch.length * 100)/roomSubCategories.length).toFixed(1));
                usersWithScore.push({...user?._doc, subCategoriesScore})
            } else if (room?.newCategory && user?.newCategory) {
                usersWithScore.push({...user?._doc, subCategoriesScore: 100})
            }
        });
    });
    
    return usersWithScore;
};
