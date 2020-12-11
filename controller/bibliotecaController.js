const bibliotecaTransaccion = require('../models/easyseguridad/biblioteca')

async function insertRecurso(req, res) {

    const rec_planilla = req.body.rec_planilla
    const rec_nombre_archivo = req.body.rec_nombre_archivo
    const rec_ubicacion_fisica = req.body.rec_ubicacion_fisica
    const rec_nivel_bibliografico = req.body.rec_nivel_bibliografico
    const rec_nivel_registro = req.body.rec_nivel_registro
    const rec_autor_personal = req.body.rec_autor_personal
    const rec_titulo = req.body.rec_titulo
    const rec_paginas = req.body.rec_paginas
    const rec_editorial = req.body.rec_editorial
    const rec_ciudad_editorial = req.body.rec_ciudad_editorial
    const rec_pais_editorial = req.body.rec_pais_editorial
    const rec_edicion = req.body.rec_edicion
    const rec_informacion_descriptiva = req.body.rec_informacion_descriptiva
    const rec_fecha_publicacion = req.body.rec_fecha_publicacion
    const rec_fecha_iso = req.body.rec_fecha_iso
    const rec_isbn = req.body.rec_isbn
    const rec_impresion_documento = req.body.rec_impresion_documento
    const rec_idioma = req.body.rec_idioma
    const rec_resumen = req.body.rec_resumen
    const rec_numero_referencias = req.body.rec_numero_referencias
    const rec_descriptores = req.body.rec_descriptores
    const rec_documentalista = req.body.rec_documentalista
    const rec_estado_obra = req.body.rec_estado_obra
    const rec_numero_ejemplares = req.body.rec_numero_ejemplares
    const rec_precio_unitario = req.body.rec_precio_unitario
    const rec_via_adquisicion = req.body.rec_via_adquisicion
    const rec_fecha_registro = req.body.rec_fecha_registro
    const rec_fecha_modificacion = req.body.rec_fecha_modificacion
    const rec_observaciones = req.body.rec_observaciones
    const rec_estado = req.body.rec_estado
    const rec_campo_1 = req.body.rec_campo_1
    const rec_campo_2 = req.body.rec_campo_2

    //   if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
    //     res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
    //   }
    try {
        const respuesta = await bibliotecaTransaccion.insertRecurso(rec_planilla, rec_nombre_archivo, rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro,
            rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial,
            rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion,
            rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias,
            rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario,
            rec_via_adquisicion, rec_fecha_registro, rec_fecha_modificacion, rec_observaciones, rec_estado,
            rec_campo_1, rec_campo_2)
        res.status(200).send({ mensaje: 'OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

// async function getAllPagosByEstado(req, res) {
//     const servicio = req.body.estado

//     //   if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
//     //     res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
//     //   }
//     try {
//         const respuesta = await pagoTransaction.getAllPagosByEstado(servicio)
//         res.status(200).send(respuesta)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ mensaje: err.message })
//     }
// }

// async function updateRegistro(req, res) {
//     const id = req.body.id
//     const estado = req.body.estado
//     const usuario = req.body.usuario
//     const fecha = req.body.fecha
//     const observacion = req.body.observacion
//     if (id === undefined || estado === undefined || usuario === undefined) {
//         res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: id, usuario, estado.' })
//     }
//     try {
//         const respuesta = await pagoTransaction.updatePagos(id, estado, usuario, fecha, observacion)

//         res.status(200).send({ mensaje: 'OK' })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ mensaje: err.message })
//     }
// }


// async function saveFile(req, res) {
//     const url = req.body.link
//         // const local = "c:\\registros"
//         // return saveImageToDisk(url, local)
//     console.log(url)
//     let image_path = 'C://registros//' + req.body.nombre;

//     try {
//         await saveImageToDisk(req.body.link, image_path);
//         res.status(200).send({ mensaje: 'OK' })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ mensaje: err.message })
//     }
// }


// var fs = require('fs');
// var https = require('https');
// //Node.js Function to save image from External URL.
// function saveImageToDisk(url, localPath) {
//     console.log('ing 1')
//     var fullUrl = url;
//     var file = fs.createWriteStream(localPath);
//     console.log('ing 2')
//     var request = https.get(url, function(response) {
//         response.pipe(file);
//     });
//     console.log('ing 3')
// }
// exports.saveImage(req, res) {


//     }

module.exports = {
    insertRecurso
}