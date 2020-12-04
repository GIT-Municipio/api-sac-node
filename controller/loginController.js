const usuariosTransaction = require('../models/easyseguridad/UsuariosTransaction')

async function login (req, res) {
  const nombrecorto = req.body.usuario
  const password = req.body.password
  const codigoApp = req.body.codigoApp
  if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
    res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
  }
  try {
    const respuesta = await usuariosTransaction.login(nombrecorto, password, codigoApp)
    res.status(200).send(respuesta)
  } catch (err) {
    console.log(err)
    res.status(500).send({ mensaje: err.message })
  }
}

module.exports = {
  login
}
