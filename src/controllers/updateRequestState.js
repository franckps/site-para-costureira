const db = require('../database/connection');

module.exports = {
    update: async function(request, response, next){
        const { id } = request.params
        const { state, state_description } = request.body
        if(!state || !state_description)
            return next()
        try{
            await db('request')
            .where({ id })
            .update({ state, state_description })
            const requestResource = (await db('request').where('id','=',id))[0];
            return response.json(requestResource)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}