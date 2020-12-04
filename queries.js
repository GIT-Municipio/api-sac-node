const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', //db user
    host: 'localhost', //db host etc: 127.0.0.1
    database: 'bdd_core_municipalidad', //db name
    password: 'postgres', // password
    port: 5432 // db port etc: 5432 for postgresql
})
// const postgres = require('./config/databases')

// const Pool = require('pg').Pool
// const pool = new Pool(postgres)
// const pool = require('./bd/bdGeneralConn')
const getAllVehicleDisplay = (request, response) => {
    pool.query("SELECT * FROM corp.tbl_aplicaciones_municipalidad ", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getVehicleDisplayById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('select * from vehicles where vehicle_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getAtribuciones = (request, response) => {
    const nombrecorto = request.body.usuario
    const password = request.body.password
    const codigoApp = request.body.codigoApp
    pool.query(`SELECT app.apm_nombre_aplicacion, mo.mom_codigo as modulo, mo.mom_nombre_modulo,mo.mom_descripcion, mo.mom_link,
    tra.trm_transaccion as transaccion, tra.trm_nombre, tra.trm_descripcion, tra.trm_link
    FROM corp.tbl_aplicaciones_municipalidad  app
    INNER JOIN corp.tbl_modulos_municipalidad mo ON app.apm_codigo = mo.apm_codigo
    INNER JOIN corp.tbl_transacciones_municipalidad tra ON tra.mom_id_modulo = mo.mom_id_modulo
    INNER JOIN corp.tbl_atribuciones_municipalidad atr ON atr.trm_id = tra.trm_id
    WHERE atr.atm_usuario = $1 AND app.apm_estado = 'ACTIVO' AND mo.mom_estado = 'ACTIVO'
    AND tra.trm_estado = 'ACTIVO' AND atr.atm_estado = 'ACTIVO'
    AND app.apm_codigo = $2 ORDER BY mo.mom_nombre_modulo ASC;`, [nombrecorto, codigoApp], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getAllVehicleDisplay,
    getVehicleDisplayById,
    getAtribuciones
}