const utilService = require('../../services/utilService')
const Pool = require('pg').Pool
const fetch = require('node-fetch')
const {pool2} = require('../../config/pg_conecciones')
/*const pool = new Pool({
    user: 'postgres', //db user
    host: '172.16.3.15', //db host etc: 127.0.0.1
    database: 'bdd_sip_sgd', //db name
    password: 'postgres', // password
    port: 5432 // db port etc: 5432 for postgresql
})*/

const pool = new Pool({
    user: 'postgres', //db user
    host: 'localhost', //db host etc: 127.0.0.1
    database: 'prueba', //db name
    password: '1234', // password
    port: 5432 // db port etc: 5432 for postgresql
})

async function getTramitesById(id) {
    const query = `SELECT id, nombre_tramite as detalle  FROM vista_plantillas_xclasifproc_externos WHERE id = $1`
    const tramites = await pool.query(query, [id])
    return (tramites.rows)
}

async function getTramitesAll() {
    const query = `SELECT plan.id,
    plan.ref_docum,
	plan.estado_tramite,
    plan.nombre_plantilla,
    plan.nombre_tramite,
	plan.enlace_gob,
    proc.ref_clasifproceso,
    clas.parent_id,
	dep.nombre_departamento
   FROM tbli_esq_plantilla plan,
    tble_proc_proceso proc,
    tble_proc_clasificacion_proceso clas,
	tblb_org_departamento dep
WHERE ((plan.refer_procesoid = proc.id) AND (proc.ref_clasifproceso = clas.id) 
		 AND ((proc.tipo_informacion)::text = 'PROCESO'::text) 
		 AND (proc.ref_tipoinf = 1))
         AND (proc.ref_departamento = dep.id)
		 AND plan.estado_tramite = 1
    ORDER BY nombre_tramite`
    /*SELECT plan.id,
    plan.ref_docum,
    plan.nombre_plantilla,
    plan.nombre_tramite,
    proc.ref_clasifproceso,
    clas.parent_id,
	dep.nombre_departamento
   FROM tbli_esq_plantilla plan,
    tble_proc_proceso proc,
    tble_proc_clasificacion_proceso clas,
	tblb_org_departamento dep
WHERE ((plan.refer_procesoid = proc.id) AND (proc.ref_clasifproceso = clas.id) 
		 AND ((proc.tipo_informacion)::text = 'PROCESO'::text) 
		 AND (proc.ref_tipoinf = 1))
         AND (proc.ref_departamento = dep.id)
    ORDER BY nombre_tramite*/
    const tramites = await pool.query(query)
    return (tramites.rows)
}

async function getRef_documentByTramite(id) {
    const query1 = 'select * from tbli_esq_plantilla where id =$1'
    const tramite = await pool2.query(query1, [id])
    //var codigo = tramite.rows[0].ref_docum
    return tramite.rows[0]
}

async function getRequisitosByTramiteId(id) {
    const query = `select req.id, req.codigo_requis, req.descripcion_requisito
                    from tblh_cr_catalogo_requisitos req
                    where ref_proceso=(select distinct refer_procesoid 
                    from vista_presentaplantilla where id=$1)`
    const requisitos = await pool.query(query, [id])
    return (requisitos.rows)
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

async function getPuntoInformacionAll() {
    const query = `SELECT plan.id,
    plan.nombre_plantilla,
    plan.nombre_tramite,
    proc.ref_clasifproceso,
    clas.parent_id,
	clas.nombre_clasif_proceso,
	clas_proc.nombre_clasif_proceso
    FROM tbli_esq_plantilla plan
   	inner join tble_proc_proceso proc on  plan.refer_procesoid = proc.id and proc.tipo_informacion::text = 'PROCESO'::text AND proc.ref_tipoinf = 1
	inner join tble_proc_clasificacion_proceso clas on proc.ref_clasifproceso = clas.id	
    inner join tble_proc_clasificacion_proceso clas_proc on clas.parent_id = clas_proc.id
    order by clas.parent_id`
    const tramites = await pool.query(query)
    return (tramites.rows)
}

async function getTramitesByNombre(nombre) {
    const query = `SELECT plan.id,
    plan.nombre_plantilla,
    plan.nombre_tramite,
    proc.ref_clasifproceso,
    clas.parent_id,
    clas.nombre_clasif_proceso,
    clas_proc.nombre_clasif_proceso
    FROM tbli_esq_plantilla plan
        inner join tble_proc_proceso proc on  plan.refer_procesoid = proc.id and proc.tipo_informacion::text = 'PROCESO'::text AND proc.ref_tipoinf = 1
    inner join tble_proc_clasificacion_proceso clas on proc.ref_clasifproceso = clas.id	
    inner join tble_proc_clasificacion_proceso clas_proc on clas.parent_id = clas_proc.id
    WHERE plan.nombre_tramite LIKE $1 
    order by clas.parent_id`
    const tramites = await pool.query(query, [nombre])
    return (tramites.rows)
}

module.exports = {
    getTramitesById,
    getTramitesAll,
    getRequisitosByTramiteId,
    getRecorridoTramiteByTramite,
    getTramitesByTramiteId,
    getDocumentoById,
    getPuntoInformacionAll,
    getTramitesByNombre,
    getRef_documentByTramite,
    getDocumentoById, 
    getPuntoInformacionAll
}