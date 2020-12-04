const pagoTransaction = require('../models/pagos/pagosTransaction')

async function insertRegistro(req, res) {
    const servicio = req.body.servicio
    const usuario = req.body.usuario
    const fechaTransaccion = req.body.fechaTransaccion
    const valorTotal = req.body.valorTotal
    const iva = req.body.iva
    const valorIva = req.body.valorIva
    const observacion = req.body.observacion
    const usuarioCreacion = req.body.usuarioCreacion
    const fechaCreacion = req.body.fechaCreacion
    const nombresContribuyente = req.body.nombresContribuyente
    const emailContribuyente = req.body.emailContribuyente
    const impuestoContribuyente = req.body.impuestoContribuyente
    const referencia = req.body.referencia
    const rutaArchivo = req.body.rutaArchivo
    //   if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
    //     res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
    //   }
    try {
        const respuesta = await pagoTransaction.insertPagos(servicio, usuario, fechaTransaccion, valorTotal, iva,
            valorIva, observacion, usuarioCreacion, fechaCreacion, nombresContribuyente,
            emailContribuyente, impuestoContribuyente, referencia, rutaArchivo)

        res.status(200).send({ mensaje: 'OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function getAllPagosByEstado(req, res) {
    const servicio = req.body.estado

    //   if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
    //     res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
    //   }
    try {
        const respuesta = await pagoTransaction.getAllPagosByEstado(servicio)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function updateRegistro(req, res) {
    const id = req.body.id
    const estado = req.body.estado
    const usuario = req.body.usuario
    const fecha = req.body.fecha
    const observacion = req.body.observacion
    if (id === undefined || estado === undefined || usuario === undefined) {
        res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: id, usuario, estado.' })
    }
    try {
        const respuesta = await pagoTransaction.updatePagos(id, estado, usuario, fecha, observacion)

        res.status(200).send({ mensaje: 'OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}


async function saveFile(req, res) {
    const url = req.body.link
    // const local = "c:\\registros"
    // return saveImageToDisk(url, local)
    console.log(url)
    let image_path='C://registros//'+req.body.nombre;
    
    try {
        await saveImageToDisk(req.body.link,image_path);
        res.status(200).send({ mensaje: 'OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}


var fs = require('fs');
var https = require('https');
//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
    console.log('ing 1')
    var fullUrl = url;
    var file = fs.createWriteStream(localPath);
    console.log('ing 2')
    var request = https.get(url, function (response) {
        response.pipe(file);
    });
    console.log('ing 3')
}
// exports.saveImage(req, res) {

    
//     }

module.exports = {
    insertRegistro,
    getAllPagosByEstado,
    updateRegistro,
    saveFile
}
