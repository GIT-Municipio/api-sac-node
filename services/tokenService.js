var jwt = require('jwt-simple')
var moment = require('moment')
var { SECRET_TOKEN, TOKEN_TIEMPO_EXPIRACION } = require('../config/variables')

function generarToken (usuario) 
{
  var payload = {
    sub: usuario,
    iat: moment().unix(), // cuando fue creado el token
    exp: moment().add(TOKEN_TIEMPO_EXPIRACION, 'minutes').unix()// expiracion token
  }
  const token = jwt.encode(payload, SECRET_TOKEN)
  return token
}

function validarToken (token) 
{
  var promise = new Promise((resolve, reject) => {
    try 
    {
      var payload = jwt.decode(token, SECRET_TOKEN)
      if (payload.exp <= moment.unix()) { reject({ mensaje: 'Su sesión ha expirado.' }) } else { resolve(payload) }
    } catch (err) 
    {
      reject({ mensaje: err.message })
    }
  })
  return promise
}

module.exports = {
  generarToken,
  validarToken
}
