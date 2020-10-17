const db = require('../database/connection');

module.exports = {
    index: async function(request, response, next){
        try{
            const product = await db('product')
            return response.json(product.map(element => {
                return {...element, 
                    image: !!element.image? `${process.env.URL}/uploads/${element.image}` : ''
                }
            }));
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    create: async function(request, response, next){
        const { image, name, description, kind, price, stock } = request.body
        try{
            const id = (await db('product').insert({ image, name, description, kind, price, stock }))[0];
            const product = (await db('product').where('id','=',id))[0];
            product.image = !!product.image? `${process.env.URL}/uploads/${product.image}` : '';
            return response.status(201).json(product)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    update: async function(request, response, next){
        const { id } = request.params
        const { image, name, description, kind, price, stock } = request.body
        try{
            await db('product')
            .where({ id })
            .update({ image, name, description, kind, price, stock })
            const product = (await db('product').where('id','=',id))[0];
            product.image = !!product.image? `${process.env.URL}/uploads/${product.image}` : '';
            return response.json(product)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    delete: async function(request, response, next){
        const { id } = request.params
        try{
            await db('product')
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