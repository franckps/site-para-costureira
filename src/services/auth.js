const jwt = require('./jwt')

module.exports = {
    authorize: function(profiles) {
        if(typeof profiles == 'string')
            profiles = [profiles]
        return async (request, response, next) => {
            let bearerToken = request.headers.authorization;
            if(!bearerToken)
                if(!!request.headers.cookie)
                    bearerToken = request.headers.cookie.token

            if(!bearerToken)
                return response.status(403).json({
                    message: 'Access deined'
                })

            const arrayBearerToken = bearerToken.split(' ');

            if(arrayBearerToken[0] !== 'Bearer')
                return response.status(403).json({
                    message: 'Malformed token'
                })
            
            if(arrayBearerToken.length !== 2)
                return response.status(403).json({
                    message: 'Malformed token'
                })
            
            const token = arrayBearerToken[1];

            const dados = await jwt.verify(token)

            if(!dados)
                return response.status(403).json({
                    message: 'Invalid token'
                })

            if(!dados.profile)
                return response.status(403).json({
                    message: 'Access deined'
                })
            
            if(!profiles.includes(dados.profile))
                return response.status(403).json({
                    message: 'Access deined'
                })

            request[dados.profile] = {id: dados.id}
            
            return next()
        }
    }
}