const db = require('../database/connection')

module.exports = {
    index: async function(request, response, next){
        const { id } = request.params
        const { browser } = request.query
        try{
            if(id){
                const customer = (await db('customer').where('id','=',id))[0];
                customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : '';
                return response.json(customer)
            }
            if(browser){
                const customer = (
                    await db('customer')
                    .where('name','like',`%${browser}%`)
                    .orWhere('login','like',`%${browser}%`)
                    .orWhere('phone','like',`%${browser}%`)
                );
                customer.image = !!customer.image? `${process.env.URL}/uploads/${customer.image}` : '';
                return response.json(customer.map(element => ({
                    ...element,
                    image: !!element.image? `${process.env.URL}/uploads/${element.image}` : ''
                })))
            }
            return next()
        }catch(error){
            return response.status(500).json({
                message: error
            })
        }
    }
}