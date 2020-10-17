const db = require('../database/connection')

module.exports = {
    index: async function(request, response, next){
        const { login } = request.params

        try{
            const user = (await db('user').where('login','=',login))[0];
            if(!!user)
                user.image = !!user.image? `${process.env.URL}/uploads/${user.image}` : '';
            return response.json(user)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}