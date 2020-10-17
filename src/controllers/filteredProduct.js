const db = require('../database/connection');

module.exports = {
    index: async function(request, response, next){
        const { id } = request.params;
        const { browser } = request.query;
        try{
            if(!!id){
                const product = (await db('product').where('id','=',id))[0];
                if(!!product)
                    product.image = !!product.image? `${process.env.URL}/uploads/${product.image}` : ''
                return response.json(product);
            }
            if(!!browser){
                const product = await db('product')
                .where('name', 'like', `%${browser}%`)
                .orWhere('description', 'like', `%${browser}%`)
                return response.json(product.map(element => {
                    return {...element, 
                        image: !!element.image? `${process.env.URL}/uploads/${element.image}` : ''
                    }
                }));
            }
            return next();
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}