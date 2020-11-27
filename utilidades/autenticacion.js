const jwt = require('jwt-simple')
const moment = require('moment')
const SECRET = 'miSecreto' 

const crearToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        expiryTime: moment().add(1,'hour').unix()
    }
    // encode
    return jwt.encode(payload, SECRET);
}

const actualUser = (authorization) => {
    const token = obtenerToken(authorization)
    if (token) {
      try {
        return jwt.decode(token, SECRET)
      } catch (error) {
        console.error('Error to get information about the actual user', error)
      }
    }
  
    return {}
  }

  
//Middle ware
const middleAuthorization = (req, res, next) => {
    
  const authorization = req.headers.authorization//buscamos en la solicitud el header y despues la autorizacion
  
  if (authorization && validarAutorizacion(authorization)) {
    next()
  } else {
    res.status(401).send( {msg: 'You must authenticate to perform the action'} )
  }
}

  const obtenerToken = (authorization) => {
    return authorization.split(' ')[1]
  }


const validarAutorizacion = (authorization) => {
    const token = authorization.split(' ')[1]
    if (token) {
        try {
            const payload = jwt.decode(token, SECRET)// decode
            if (payload.expiryTime < moment().unix()) {
                console.error('This token is old')
                return false
            }
            return true
        } catch (error) {
            console.error('Error to valid the token', error)
        }
    }
    //console.log("authorization",authorization)
    return false // todo sera invalido
}


module.exports = { actualUser , crearToken, middleAuthorization, validarAutorizacion }