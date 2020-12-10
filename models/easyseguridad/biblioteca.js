const utilService = require('../../services/utilService')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', //db user
    host: '172.16.3.35', //db host etc: 127.0.0.1
    database: 'bdd_core_municipalidad', //db name
    password: 'postgres', // password
    port: 5432 // db port etc: 5432 for postgresql
})
async function insertRecurso(rec_planilla, rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro,
    rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial,
    rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion,
    rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias,
    rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario,
    rec_via_adquisicion, rec_fecha_registro, rec_fecha_modificacion, rec_observaciones, rec_estado,
    rec_campo_1, rec_campo_2) {
    let now = new Date();
    const query = `INSERT INTO biblioteca.tbl_recursos(
        rec_mfn, rec_planilla, rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro, 
        rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial, 
        rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion, 
        rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias, 
        rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario, 
        rec_via_adquisicion, rec_fecha_registro, rec_fecha_modificacion, rec_observaciones, rec_estado, 
        rec_campo_1, rec_campo_2)
        VALUES (default,
             $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
             $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31);`
    const insert = await pool.query(query, [rec_planilla, rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro,
            rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial,
            rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion,
            rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias,
            rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario,
            rec_via_adquisicion, now, rec_fecha_modificacion, rec_observaciones, rec_estado,
            rec_campo_1, rec_campo_2
        ])
        // const format = utilService.formatAtribuciones(atribuciones.rows)
    return (insert)
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

async function getAtribuciones(usuario, aplicacion) {
    const query = `SELECT app.apm_nombre_aplicacion, mo.mom_codigo as modulo, mo.mom_nombre_modulo,mo.mom_descripcion, mo.mom_link,
    tra.trm_transaccion as transaccion, tra.trm_nombre, tra.trm_descripcion, tra.trm_link
    FROM corp.tbl_aplicaciones_municipalidad  app
    INNER JOIN corp.tbl_modulos_municipalidad mo ON app.apm_codigo = mo.apm_codigo
    INNER JOIN corp.tbl_transacciones_municipalidad tra ON tra.mom_id_modulo = mo.mom_id_modulo
    INNER JOIN corp.tbl_atribuciones_municipalidad atr ON atr.trm_id = tra.trm_id
    WHERE atr.atm_usuario = $1 AND app.apm_estado = 'ACTIVO' AND mo.mom_estado = 'ACTIVO'
    AND tra.trm_estado = 'ACTIVO' AND atr.atm_estado = 'ACTIVO'
    AND app.apm_codigo = $2 ORDER BY mo.mom_nombre_modulo ASC;`
    const atribuciones = await pool.query(query, [usuario, aplicacion])
    const format = utilService.formatAtribuciones(atribuciones.rows)
    return format
}

async function getUsuario(cedula) {
    const query = `SELECT * FROM corp.tbl_usuarios_municipalidad  
    WHERE usm_cedula = $1 AND usm_estado = 'ACTIVO'`
    const usuario = await pool.query(query, [cedula])
        // const format = utilService.formatAtribuciones(atribuciones.rows)
    return usuario.rows[0]
}

module.exports = {
    insertRecurso
}