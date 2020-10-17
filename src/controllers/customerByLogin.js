const db = require('../database/connection')

module.exports = {
    index: async function(request, response, next){
        const { login } = request.params
        try{
            const customer = (await db('customer').where('login','=',login))[0];
            if(!!customer)
                customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : ''
            return response.json(customer)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}