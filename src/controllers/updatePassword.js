const db = require('../database/connection');
const passwordEncrypter = require('../services/passwordEncrypter');

module.exports = {
    update: async function(request, response, next){
        const { id } = request.params
        let resource = ''
        if(!!request.customer)
            resource = 'customer'
        else if(!!request.user)
            resource = 'user'

        const { password } = request.body

        if(!password || !resource) {
            return next();
        }
        try{
            const encryptedPassword = await passwordEncrypter.hash(password);

            if(resource === 'user') {
                await db('user')
                .where({ id })
                .update({ password: encryptedPassword })
                const user = (await db('user').where('id','=',id))[0];
                user.image = !!user.image? `${process.env.URL}/uploads/${user.image}` : '';
                return response.json(user)
            } else if(resource === 'customer') {
                await db('customer')
                .where({ id })
                .update({ password: encryptedPassword })
                const customer = (await db('customer').where('id','=',id))[0];
                customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : '';
                return response.json(customer)
            }
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}