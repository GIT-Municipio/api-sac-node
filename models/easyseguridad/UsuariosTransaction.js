const soap = require('soap-as-promised')
const UsuariosModel = require('./base/UsuariosModel')
const tokenService = require('../../services/tokenService')
const AtribucionesTransaction = require('./AtribucionesTransaction')

const { WS_EASYLOGIN_HOST, WS_EASYLOGIN_URL } = require('../../config/variables')

function getUsuario(cedula) {
    return UsuariosModel.findByPk(cedula, { raw: true })
}

async function validarPassword(password, password_encrypted) {
    const url_ws_easylogin = WS_EASYLOGIN_HOST + WS_EASYLOGIN_URL + '?wsdl'
    const args = { cadena: password, llave: 'easy@123' }
    const client = await soap.createClient(url_ws_easylogin)
    const result = await client.getEncriptarCadena(args)
    if (result !== null) {
        const pwd_encrypted = result.getEncriptarCadenaResult
        if (pwd_encrypted === password_encrypted) { return { mensaje: 'OK' } } // login correcto
        else { return { mensaje: 'Contraseña incorrecta.' } }
    } else { return { mensaje: 'Error al validar password.' } }
}

async function login(usuario, password, app) {
    // const usuario_obj = await getUsuario(usuario)
    const usuario_obj = await AtribucionesTransaction.getUsuario(usuario)
    console.log(usuario_obj)
    if (usuario_obj) {
        const estado = usuario_obj.usm_estado.toLowerCase()
        if (estado === 'INACTIVO') { return { mensaje: `No se puede ingresar, usuario: ${estado}` } }

        const password_encrypted = usuario_obj.password
            // const valido = await validarPassword(password, password_encrypted)

        if (usuario_obj.usm_password === password) {
            console.log('ing' + usuario)
            const token = tokenService.generarToken(usuario)
            const permisos = await AtribucionesTransaction.getAtribuciones(usuario, app)
            const aplicacion = await AtribucionesTransaction.getApp(app)
            return {
                mensaje: 'OK',
                aplicacion: aplicacion,
                token: token,
                cedula: usuario_obj.usm_cedula,
                usuario: usuario_obj.usm_nombres + ' ' + usuario_obj.usm_apellidos,
                permisos: permisos
            }
        } else { return { mensaje: 'Usuario o contraseña incorrectos.' } }
    } else {
        return { mensaje: 'Usuario no encontrado.' }
    }
}

module.exports = {
    validarPassword,
    login
}