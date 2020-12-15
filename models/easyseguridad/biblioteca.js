const utilService = require('../../services/utilService')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', //db user
    host: '172.16.3.35', //db host etc: 127.0.0.1
    database: 'bdd_core_municipalidad', //db name
    password: 'postgres', // password
    port: 5432 // db port etc: 5432 for postgresql
})

async function insertRecurso(rec_planilla, rec_nombre_archivo, rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro,
    rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial,
    rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion,
    rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias,
    rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario,
    rec_via_adquisicion, rec_fecha_registro, rec_fecha_modificacion, rec_observaciones, rec_estado,
    rec_campo_1, rec_campo_2) {
    let now = new Date();
    const query = `INSERT INTO biblioteca.tbl_recursos(
        rec_mfn, rec_planilla, rec_nombre_archivo,rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro, 
        rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial, 
        rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion, 
        rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias, 
        rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario, 
        rec_via_adquisicion, rec_fecha_registro, rec_fecha_modificacion, rec_observaciones, rec_estado, 
        rec_campo_1, rec_campo_2)
        VALUES (default,
             $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
             $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32);`
    const insert = await pool.query(query, [rec_planilla, rec_nombre_archivo, rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro,
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

async function getAllRecursosByEstado(estado) {
    const query = `SELECT rec_mfn, rec_planilla, rec_nombre_archivo,rec_ubicacion_fisica,  
    rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, 
    rec_pais_editorial,rec_informacion_descriptiva, 
    rec_impresion_documento, rec_idioma, rec_resumen,
    rec_estado_obra, rec_numero_ejemplares,  
    rec_fecha_registro,  rec_observaciones, rec_estado
    FROM biblioteca.tbl_recursos
    WHERE rec_estado = $1 
    ORDER BY rec_mfn;`
    const recursos = await pool.query(query, [estado])
    return (recursos.rows)
}

async function getRecursoById(id) {
    const query = `SELECT rec_mfn, rec_planilla, rec_nombre_archivo,rec_ubicacion_fisica, rec_nivel_bibliografico, rec_nivel_registro, 
    rec_autor_personal, rec_titulo, rec_paginas, rec_editorial, rec_ciudad_editorial, 
    rec_pais_editorial, rec_edicion, rec_informacion_descriptiva, rec_fecha_publicacion, 
    rec_fecha_iso, rec_isbn, rec_impresion_documento, rec_idioma, rec_resumen, rec_numero_referencias, 
    rec_descriptores, rec_documentalista, rec_estado_obra, rec_numero_ejemplares, rec_precio_unitario, 
    rec_via_adquisicion, rec_fecha_registro, rec_fecha_modificacion, rec_observaciones, rec_estado, 
    rec_campo_1, rec_campo_2 
    FROM biblioteca.tbl_recursos
    WHERE rec_mfn = $1 
    ORDER BY rec_mfn;`
    const recursos = await pool.query(query, [id])
    return (recursos.rows)
}

async function insertPrestamo(rec_mfn, pre_cedula, pre_nombres, pre_apellidos, pre_institucion,
    pre_nivel, pre_fecha_prestamo, pre_fecha_entrega, pre_observaciones, pre_estado, pre_campo_1,
    pre_campo_2, pre_campo_3, pre_campo_4) {
    let now = new Date();
    const query = `INSERT INTO biblioteca.tbl_prestamos(
        pre_id, rec_mfn, pre_cedula, pre_nombres, pre_apellidos, pre_institucion, pre_nivel, pre_fecha_prestamo, pre_fecha_entrega, pre_observaciones, pre_estado, pre_campo_1, pre_campo_2, pre_campo_3, pre_campo_4)
        VALUES (default,
             $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`
    const insert = await pool.query(query, [rec_mfn, pre_cedula, pre_nombres, pre_apellidos, pre_institucion,
        pre_nivel, pre_fecha_prestamo, pre_fecha_entrega, pre_observaciones, pre_estado, pre_campo_1,
        pre_campo_2, pre_campo_3, pre_campo_4
    ])
    return (insert)
}
async function getAllPrestamosByEstado(estado) {
    query = '';
    recursos = '';
    if (estado == null || estado == '') {
        query = `SELECT pre_id, rec.rec_mfn, rec.rec_titulo, rec.rec_autor_personal,pre_cedula, pre_nombres, pre_apellidos, pre_institucion,
        pre_nivel, pre_fecha_prestamo, pre_fecha_entrega, pre_observaciones, pre_estado, pre_campo_1,
        pre_campo_2, pre_campo_3, pre_campo_4
        FROM biblioteca.tbl_prestamos pre
        INNER JOIN biblioteca.tbl_recursos rec ON pre.rec_mfn = rec.rec_mfn
        ORDER BY pre.pre_id desc;`
        recursos = await pool.query(query, [])
    } else {
        query = `SELECT pre_id, rec.rec_mfn, rec.rec_titulo, rec.rec_autor_personal,pre_cedula, pre_nombres, pre_apellidos, pre_institucion,
        pre_nivel, pre_fecha_prestamo, pre_fecha_entrega, pre_observaciones, pre_estado, pre_campo_1,
        pre_campo_2, pre_campo_3, pre_campo_4
        FROM biblioteca.tbl_prestamos pre
        INNER JOIN biblioteca.tbl_recursos rec ON pre.rec_mfn = rec.rec_mfn
        WHERE pre_estado = $1
        ORDER BY pre.pre_id desc;`
        recursos = await pool.query(query, [estado])
    }
    return (recursos.rows)
}

async function updatePrestamo(id, estado, fecha_entrega, observaciones) {
    const query = `UPDATE biblioteca.tbl_prestamos SET pre_estado = $2 , 
    pre_fecha_entrega = $3 , pre_campo_3 = $4  
    WHERE pre_id = $1;`
    const prestamo = await pool.query(query, [id, estado, fecha_entrega, observaciones])
    return (prestamo)
}
module.exports = {
    insertRecurso,
    getAllRecursosByEstado,
    getRecursoById,
    insertPrestamo,
    getAllPrestamosByEstado,
    updatePrestamo
}