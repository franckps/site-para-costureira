const db = require('../database/connection');
const passwordEncrypter = require('../services/passwordEncrypter');
const jwt = require('../services/jwt');

module.exports = {
    create: async function(request, response, next){
        const { login, password } = request.body
        try{
            const user = (await db('user').where('login','=',login))[0];
            if(!user)
                return response.status(400).json({
                    message: 'Invalid Login'
                })
                
            let validPassword = await passwordEncrypter.compare(password, user.password)
            if(!user.password && !password)
                validPassword = true
                
            if(!validPassword)
                return response.status(400).json({
                    message: 'Invalid password'
                })
            
            user.image = !!user.image? `${process.env.URL}/uploads/${user.image}` : '';

            const token = await jwt.sign({...user, profile: 'user', password: undefined})

            return response.json({...user, profile: 'user', password: undefined, token})
        }catch(error){
            console.log(error)
            return response.status(500).json({
                message: error
            })
        }
    }
}