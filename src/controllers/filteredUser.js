const db = require('../database/connection')

module.exports = {
    index: async function(request, response, next){
        const { id } = request.params

        try{
            const user = (await db('user').where('id','=',id))[0];
            user.image = !!user.image? `${process.env.URL}/uploads/${user.image}` : '';
            return response.json(user)
        }catch(error){
            console.log(error)
            return response.status(500).json({
                message: error
            })
        }
    }
}