const {spawn} = require('child_process')

function crearCarpetaUsuario(cedula)
{
    var ruta = `D:\\Descargas\\${cedula}`
    const comando = spawn('cmd', ['/c',`mkdir ${ruta}`])
    return ruta
}

module.exports = {
    crearCarpetaUsuario
}