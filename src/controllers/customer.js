const db = require('../database/connection');
const passwordEncrypter = require('../services/passwordEncrypter');
const customerSession = require('./customerSession');

module.exports = {
    index: async function(request, response, next){
        try{
            const customer = await db('customer')
            return response.json(customer.map(element => {
                return {...element, 
                    image: !!element.image? `${process.env.URL}/uploads/${element.image}` : ''
                }
            }))
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    create: async function(request, response, next){
        const { image, name, phone, login, password } = request.body
        try{
            const encryptedPassword = await passwordEncrypter.hash(password);
            const id = (await db('customer').insert({ image, name, phone, login, password: encryptedPassword }))[0];
            //const customer = (await db('customer').where('id','=',id))[0];
            //return response.status(201).json(customer)
            return customerSession.create(request, response, next);
        }catch(error){
            console.log(error)
            return response.status(500).json({
                message: error
            })
        }
    },
    update: async function(request, response, next){
        const { id } = request.params
        const { image, name, phone } = request.body
        console.log("image, name, phone: ", { image, name, phone })

        try{
            if(!image && !name && !phone){
                const customer = (await db('customer').where('id','=',id))[0];
                customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : ''
                return response.json(customer)
            }
            
            await db('customer')
            .where({ id })
            .update({ image, name, phone })
            const customer = (await db('customer').where('id','=',id))[0];
            customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : ''
            return response.json(customer)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    delete: async function(request, response, next){
        const { id } = request.params
        try{
            await db('customer')
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