const db = require('../database/connection');

module.exports = {
    index: async function(request, response, next){
        const { id } = request.params;
        const { browser } = request.query;
        try{
            if(!!id){
                const service = (await db('service').where('id','=',id))[0];
                if(!!service)
                    service.image = !!service.image? `${process.env.URL}/uploads/${service.image}` : ''
                return response.json(service);
            }
            if(!!browser){
                const service = await db('service')
                .where('name', 'like', `%${browser}%`)
                .orWhere('description', 'like', `%${browser}%`)
                return response.json(service.map(element => {
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