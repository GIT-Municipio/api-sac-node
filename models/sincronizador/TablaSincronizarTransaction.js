const { TablaSincronizarModel } = require('./base/TablaSincronizarModel')

function getListaTablasAll(estados) {
    return TablaSincronizarModel.findAll({
        where: {
            estado: estados
        }
    })
}

function createTable(tabla) {
    return TablaSincronizarModel.create(tabla)
}

function createOrUpdateTable(tabla) {
    if (tabla.id) { return TablaSincronizarModel.update(tabla, { where: { id: tabla.id } }) } else { return TablaSincronizarModel.create(tabla) }
}

module.exports = {
    getListaTablasAll,
    createTable,
    createOrUpdateTable
}
