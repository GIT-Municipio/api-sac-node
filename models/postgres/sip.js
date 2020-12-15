const utilService = require('../../services/utilService')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', //db user
    host: '172.16.3.15', //db host etc: 127.0.0.1
    database: 'bdd_sip_sgd', //db name
    password: 'postgres', // password
    port: 5432 // db port etc: 5432 for postgresql
})

async function getTramitesById(id) {
    const query = `SELECT id, nombre_tramite as detalle  FROM vista_plantillas_xclasifproc_externos WHERE id = $1`
    const tramites = await pool.query(query, [id])
    return (tramites.rows)
}

async function getTramitesAll() {
    const query = `SELECT * FROM vista_plantillas_xclasifproc_externos`
    const tramites = await pool.query(query)
    return (tramites.rows)
}

async function getRequisitosByTramiteId(id) {
    const query = `select * from  vista_presentaplantilla where id = $1 ;`
    const tramites = await pool.query(query, [id])
    return (tramites.rows)
}


async function getRecorridoTramiteByTramite(tramite) {
    console.log(tramite)
    const query = `SELECT id, origen_nombres, origen_form_asunto as asunto , 
    ultimonivel as leaf, to_char(origen_fecha_creado, 'DD Mon YYYY')  as fecha,hora_ingreso, respuesta_estado as estado, 
    destino_nombres,destino_cargo,destino_departament, origen_departament,origen_tipo_tramite,origen_tipodoc,respuesta_observacion,
    respuesta_comentariotxt,fech_tiempo_dias,fecha_tiempo_atencion,resp_comentario_anterior, 
    codigo_documento, parent_id, item_orden 
    FROM public.tbli_esq_plant_formunico_docsinternos
    WHERE codi_barras = $1
    order by item_orden `
    const tramites = await pool.query(query, [tramite])
    return (tramites.rows)
}

async function getTramitesByTramiteId(tramite) {
    console.log(tramite)
    tramite = '%' + tramite + '%'
    const query = `WITH summary AS (
        SELECT p.id, 
               p.codi_barras,
               p.num_memocreado as codigo_tramite,
               p.origen_nombres as nombres, 
               p.origen_form_asunto as asunto,
               p.origen_tipodoc as tramite,
               p.origen_fecha_creado as fecha,
               p.item_orden,
               ROW_NUMBER() OVER(PARTITION BY p.codi_barras 			  
               ORDER BY p.item_orden) AS rk
          FROM public.tbli_esq_plant_formunico_docsinternos p
    WHERE p.codi_barras like $1)
    SELECT s.*
    FROM summary s
    WHERE s.rk = 1 `
    const tramites = await pool.query(query, [tramite])
    return (tramites.rows)
}

async function getDocumentoById(codigo) {
    const query = `SELECT id, origen_nombres, origen_form_asunto , 
    ultimonivel as leaf, to_char(origen_fecha_creado, 'DD Mon YYYY') as fecha,hora_ingreso, respuesta_estado as estado, 
    destino_nombres,destino_cargo, destino_departament, origen_departament,origen_tipo_tramite,origen_tipodoc,respuesta_observacion,
    respuesta_comentariotxt,fech_tiempo_dias,fecha_tiempo_atencion,resp_comentario_anterior, 
    codigo_documento, parent_id, item_orden, resp_estado_anterior as estado
    FROM public.tbli_esq_plant_formunico_docsinternos
    WHERE id = $1
    order by item_orden `
    const tramites = await pool.query(query, [codigo])
    return (tramites.rows)
}

module.exports = {
    getTramitesById,
    getTramitesAll,
    getRequisitosByTramiteId,
    getRecorridoTramiteByTramite,
    getTramitesByTramiteId,
    getDocumentoById
}