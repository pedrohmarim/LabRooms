const testModel = require('../models/testModel');

module.exports = {
    async test(request, response){
        const { nome, sobrenome } = request.body.headers.DTO;

        testModel.create({
            nome,
            sobrenome
        }).then(()=>{
            return response.json({message: 'Foi pro bd!!!!'})
        }).catch(err =>{
            return response.json({message: `deu erro ekew = ${err}`})
        })
        
        // return(response.json({
        //     nomeCompleto: nome + ' henrique'
        // }));
    }
}