const db = require('../database/connection');

module.exports = {
    index: async function(request, response, next){
        try{
            const service = await db('service')
            return response.json(service.map(element => {
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
        const { image, name, description, kind, price } = request.body
        try{
            const id = (await db('service').insert({ image, name, description, kind, price }))[0];
            const service = (await db('service').where('id','=',id))[0];
            service.image = !!service.image? `${process.env.URL}/uploads/${service.image}` : '';
            return response.status(201).json(service)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    update: async function(request, response, next){
        const { id } = request.params
        const { image, name, description, kind, price } = request.body
        try{
            await db('service')
            .where({ id })
            .update({ image, name, description, kind, price })
            const service = (await db('service').where('id','=',id))[0];
            service.image = !!service.image? `${process.env.URL}/uploads/${service.image}` : '';
            return response.json(service)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    delete: async function(request, response, next){
        const { id } = request.params
        try{
            await db('service')
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