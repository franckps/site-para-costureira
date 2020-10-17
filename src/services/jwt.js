const jwt = require('jsonwebtoken')

module.exports = {
    sign: function(data) {
        return new Promise((resolve, reject) => {
            try{
                token = jwt.sign(data, !!process.env.PRIVATE_KEY? process.env.PRIVATE_KEY : 'shhhhh');
                return resolve(token);
            }catch(err) {
                return reject(err);
            }
        })
    },
    verify: function(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, !!process.env.PRIVATE_KEY? process.env.PRIVATE_KEY : 'shhhhh', (err, decoded) => {
                if(!!err)
                    return reject(err);
                else
                    return resolve(decoded);
            });
        })
        
    }
}