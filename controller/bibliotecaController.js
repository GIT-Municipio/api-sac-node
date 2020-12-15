const bibliotecaTransaccion = require('../models/easyseguridad/biblioteca')
const biblioteca = require('../models/easyseguridad/biblioteca')

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

async function getAllRecursosByEstado(req, res) {
    const estado = req.body.estado
    try {
        const respuesta = await bibliotecaTransaccion.getAllRecursosByEstado(estado)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function getRecursoById(req, res) {
    const id = req.body.id
    try {
        const respuesta = await bibliotecaTransaccion.getRecursoById(id)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function insertPrestamo(req, res) {
    const rec_mfn = req.body.rec_mfn
    const pre_cedula = req.body.pre_cedula
    const pre_nombres = req.body.pre_nombres
    const pre_apellidos = req.body.pre_apellidos
    const pre_institucion = req.body.pre_institucion
    const pre_nivel = req.body.pre_nivel
    const pre_fecha_prestamo = req.body.pre_fecha_prestamo
    const pre_fecha_entrega = req.body.pre_fecha_entrega
    const pre_observaciones = req.body.pre_observaciones
    const pre_estado = req.body.pre_estado
    const pre_campo_1 = req.body.pre_campo_1
    const pre_campo_2 = req.body.pre_campo_2
    const pre_campo_3 = req.body.pre_campo_3
    const pre_campo_4 = req.body.pre_campo_4
        //   if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
        //     res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
        //   }
    try {
        const respuesta = await bibliotecaTransaccion.insertPrestamo(rec_mfn, pre_cedula, pre_nombres, pre_apellidos, pre_institucion,
            pre_nivel, pre_fecha_prestamo, pre_fecha_entrega, pre_observaciones, pre_estado, pre_campo_1,
            pre_campo_2, pre_campo_3, pre_campo_4)
        res.status(200).send({ mensaje: 'OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}
async function getAllPrestamosByEstado(req, res) {
    const estado = req.body.pre_estado
    try {
        const respuesta = await biblioteca.getAllPrestamosByEstado(estado)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function updatePrestamo(req, res) {
    const pre_id = req.body.pre_id
    const estado = req.body.pre_estado
    const fecha_entrega = new Date();
    const observaciones = req.body.pre_campo_3
    if (pre_id === undefined || estado === undefined) {
        res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: id, estado.' })
    }
    try {
        const respuesta = await biblioteca.updatePrestamo(pre_id, estado, fecha_entrega, observaciones)
        res.status(200).send({ mensaje: 'OK' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}
module.exports = {
    insertRecurso,
    getAllRecursosByEstado,
    getRecursoById,
    insertPrestamo,
    getAllPrestamosByEstado,
    updatePrestamo
}