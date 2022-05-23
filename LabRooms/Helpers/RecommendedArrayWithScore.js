module.exports = async (rooms, users, recomendedRooms = false) => {
    const arrayScore = []

    rooms.forEach(async room => {
        users.forEach(user => {
            let subCategoriesScore;
            let priceScore;
            let itemScore;

            if (room?.hourprice > user?.hourprice) priceScore = Number(((user?.hourprice * 100) / (room?.hourprice)).toFixed(1));
            else priceScore = Number((((room?.hourprice * 100) / user?.hourprice)).toFixed(1));

            if ((user?.categoryId === room?.categoryId)) {
                let roomSubCategories = JSON.parse(JSON.stringify(room?.subCategories)); 
                let userSubCategories = JSON.parse(JSON.stringify(user?.subCategories)); 

                let subCategoriesMatch = roomSubCategories.filter(sub => userSubCategories.includes(sub))

                subCategoriesScore = Number(((subCategoriesMatch.length * 100)/roomSubCategories.length).toFixed(1));

                itemScore = ((subCategoriesScore + priceScore)/2)
                
               if(!recomendedRooms) arrayScore.push({...user?._doc,itemScore})
               else arrayScore.push({...room?._doc,itemScore})
            } else if (room?.newCategory && user?.newCategory) {
                subCategoriesScore = 100;
                if(!recomendedRooms) arrayScore.push({...user?._doc,itemScore})
                else arrayScore.push({...room?._doc,itemScore})
            }
        });
    });
    
    return arrayScore;
};
