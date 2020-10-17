const db = require('../database/connection');
const passwordEncrypter = require('../services/passwordEncrypter');
const jwt = require('../services/jwt');

module.exports = {
    create: async function(request, response, next){
        const { login, password } = request.body
        try{
            const customer = (await db('customer').where('login','=',login))[0];
            
            if(!customer)
                return response.status(400).json({
                    message: 'Invalid Login'
                })

            const validPassword = await passwordEncrypter.compare(password, customer.password)
            if(!validPassword)
                return response.status(400).json({
                    message: 'Invalid password'
                })
            customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : '';

            const token = await jwt.sign({...customer, profile: 'customer', password: undefined})

            return response.json({...customer, profile: 'customer', password: undefined, token})
        }catch(error){
            console.log(error)
            return response.status(500).json({
                message: error
            })
        }
    }
}