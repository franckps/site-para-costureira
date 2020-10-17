const db = require('../database/connection');

module.exports = {
    index: async function(request, response, next){
        const customer = request.customer
        console.log(customer)
        try{
            let requestResource = [];
            if(!!customer) {
                requestResource = await db('request')
                .select(
                    "request.*",
                    "customer.image",
                    "customer.name",
                    "customer.phone",
                    "customer.login",
                    "customer.password",
                    "product.image as product_image",
                    "product.name as product_name",
                    "product.description as product_description",
                    "product.kind as product_kind",
                    "product.price as product_price",
                    "service.image as service_image",
                    "service.name as service_name",
                    "service.description as service_description",
                    "service.kind as service_kind",
                    "service.price as service_price"
                )
                .join('customer','customer.id','request.customer_id')
                .leftJoin('product','product.id','request.product_id')
                .leftJoin('service','service.id','request.service_id')
                .where('customer.id','=',customer.id)
                .orderBy('request.state')
            } else {
                requestResource = await db('request')
                .select(
                    "request.*",
                    "customer.image",
                    "customer.name",
                    "customer.phone",
                    "customer.login",
                    "customer.password",
                    "product.image as product_image",
                    "product.name as product_name",
                    "product.description as product_description",
                    "product.kind as product_kind",
                    "product.price as product_price",
                    "service.image as service_image",
                    "service.name as service_name",
                    "service.description as service_description",
                    "service.kind as service_kind",
                    "service.price as service_price"
                )
                .join('customer','customer.id','request.customer_id')
                .leftJoin('product','product.id','request.product_id')
                .leftJoin('service','service.id','request.service_id')
                .orderBy('request.state')
            }
            return response.json(requestResource.map(element => {
                return {
                    ...element, 
                    image: !!element.image? `${process.env.URL}/uploads/${element.image}` : null,
                    product_image: !!element.product_image? `${process.env.URL}/uploads/${element.product_image}` : null,
                    service_image: !!element.service_image? `${process.env.URL}/uploads/${element.service_image}` : null,
                }
            }))
        }catch(error){
            console.log(error)
            return response.status(500).json({
                message: error
            })
        }
    },
    create: async function(request, response, next){
        const customer = request.customer
        if(!customer)
            return response.status(500).json({
                message: 'Customer not logged'
            })
        const { description, amount, product_id, service_id } = request.body
        try{
            const id = (await db('request').insert({ description, amount: !!amount? amount : '1', customer_id: customer.id, product_id, service_id }))[0];
            const requestResource = (await db('request').where('id','=',id))[0];
            return response.status(201).json(requestResource)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    update: async function(request, response, next){
        const { id } = request.params
        const { description, amount, product_id, service_id } = request.body
        try{
            await db('request')
            .where({ id })
            .update({ description, amount, product_id, service_id })
            const requestResource = (await db('request').where('id','=',id))[0];
            return response.json(requestResource)
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    },
    delete: async function(request, response, next){
        const { id } = request.params
        try{
            await db('request')
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