const utilService = require('../../services/utilService')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', //db user
    host: '172.16.7.23', //db host etc: 127.0.0.1
    database: 'bdd_core_municipalidad', //db name
    password: 'postgres', // password
    port: 5432 // db port etc: 5432 for postgresql
})

async function insertPagos(servicio, usuario, fechaTransaccion, valorTotal, iva,
    valorIva, observacion, usuarioCreacion, fechaCreacion, nombresContribuyente,
    emailContribuyente, impuestoContribuyente, referencia, rutaArchivo) {
    let now = new Date();

    const query = `INSERT INTO trans.tbl_pagos_servicios_municipalidad
    (sem_id_servicio, psm_usuario_transaccion, psm_fecha_transaccion,
    psm_valor, psm_iva, psm_valor_iva, psm_observacion, psm_estado,
    psm_usuario_creacion, psm_fecha_creacion,  psm_campo1,
    psm_campo2, psm_campo3, psm_campo4, psm_campo5)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`
    const insert = await pool.query(query, [servicio, usuario, fechaTransaccion, valorTotal, iva,
        valorIva, observacion, 'INGRESADO', usuarioCreacion, now, nombresContribuyente,
        emailContribuyente, impuestoContribuyente, referencia, rutaArchivo])
    // const format = utilService.formatAtribuciones(atribuciones.rows)
    return (insert)
}

async function getAllPagosByEstado(estado) {
    const query = `SELECT * FROM trans.tbl_pagos_servicios_municipalidad
    WHERE psm_estado = $1 ORDER BY psm_id_pago DESC;`
    const pagos = await pool.query(query, [estado])
    return (pagos.rows)
}

async function updatePagos(id, estado, usuario, fecha, observacion) {
    let now = new Date();
    const query = `UPDATE trans.tbl_pagos_servicios_municipalidad
    SET psm_estado= $1, psm_usuario_modificacion_rev= $2, psm_fecha_modificacion_rev= $3, psm_observacion = $4
    WHERE psm_id_pago = $5;`
    const update = await pool.query(query, [estado, usuario, now, observacion, id])
    return (update)
}

module.exports = {
    insertPagos,
    getAllPagosByEstado,
    updatePagos
}