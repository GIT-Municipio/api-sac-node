const usuariosTransaction = require('../models/easyseguridad/UsuariosTransaction')
const usuarios_nuevos = require('../models/usuarios/modelo_usuarios')

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

async function insertNuevoUsuario(req, res)
{
    const cedula = req.body.cedula
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const password = req.body.password
    const email = req.body.email

    try {
        const respuesta = await usuarios_nuevos.insertNuevoUsuario(cedula,nombres,apellidos,password,email)
        res.status(200).send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(500).send({mensaje:error.message})
    }
}

module.exports = {
  login,
  insertNuevoUsuario
}
