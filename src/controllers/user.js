const db = require('../database/connection');
const passwordEncrypter = require('../services/passwordEncrypter');
const userSession = require('./userSession');

module.exports = {
    index: async function(request, response, next){
        try{
            const user = await db('user')
            return response.json(user.map(element => {
                return {...element, 
                    image: !!element.image? `${process.env.URL}/uploads/${element.image}` : ''
                }
            }))
            return response.json(user)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    create: async function(request, response, next){
        const { image, name, login, password } = request.body
        try{
            const encryptedPassword = await passwordEncrypter.hash(password);
            const id = (await db('user').insert({ image, name, login, password: encryptedPassword }))[0];
            //const user = (await db('user').where('id','=',id))[0];
            //return response.status(201).json(user)
            return userSession.create(request, response, next);
        }catch(error){
            console.log(error)
            return response.status(500).json({
                message: error
            })
        }
    },
    update: async function(request, response, next){
        const { id } = request.params
        const { image, name } = request.body
        try{
            if(!image && !name) {
                const user = (await db('user').where('id','=',id))[0];
                user.image = !!user.image? `${process.env.URL}/uploads/${user.image}` : '';
                return response.json(user)
            }
            await db('user')
            .where({ id })
            .update({ name, image })
            const user = (await db('user').where('id','=',id))[0];
            user.image = !!user.image? `${process.env.URL}/uploads/${user.image}` : '';
            return response.json(user)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    delete: async function(request, response, next){
        const { id } = request.params
        try{
            await db('user')
            .where({ id })
            .del()
            return response.status(204).send()
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
}