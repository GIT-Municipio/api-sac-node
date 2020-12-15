const tramiteTransaccion = require('../models/postgres/sip')


async function getTramitesById(req, res) {
    const id = req.body.id
    try {
        const respuesta = await tramiteTransaccion.getTramitesById(id)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}
async function getTramitesAll(req, res) {
    try {
        const respuesta = await tramiteTransaccion.getTramitesAll()
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}
async function getRequisitosByTramiteId(req, res) {
    const id = req.body.id
    try {
        const respuesta = await tramiteTransaccion.getRequisitosByTramiteId(id)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function getRecorridoTramiteByTramite(req, res) {
    const tramite = req.body.tramite
    console.log(tramite)
    try {
        const respuesta = await tramiteTransaccion.getRecorridoTramiteByTramite(tramite)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function getTramitesByTramiteId(req, res) {
    const tramite = req.body.tramite
    console.log(tramite)
    try {
        const respuesta = await tramiteTransaccion.getTramitesByTramiteId(tramite)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function getDocumentoById(req, res) {
    const codigo = req.body.codigo
    try {
        const respuesta = await tramiteTransaccion.getDocumentoById(codigo)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message })
    }
}

async function getPuntoInformacionAll(req, res){
    try {
        const respuesta = await tramiteTransaccion.getPuntoInformacionAll()
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({mensaje: err.message})
    }
}

async function getTramiteByNombre(req, res){
    const nombre = req.body.nombre
    try {
        const respuesta = await tramiteTransaccion.getTramiteByNombre(nombre)
        res.status(200).send(respuesta)
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.message})
    }
}

module.exports = {
    getTramitesById,
    getTramitesAll,
    getRequisitosByTramiteId,
    getRecorridoTramiteByTramite,
    getTramitesByTramiteId,
    getDocumentoById,
    getPuntoInformacionAll,
    getTramiteByNombre
}