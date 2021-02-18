const utilService = require('../../services/utilService')
const {pool2} = require('../../config/pg_conecciones')

async function insertNuevoUsuario(cedula, nombres, apellidos, password, email)
{
    const query = `INSERT INTO corp.tbl_usuarios_municipalidad (usm_cedula, usm_nombres, usm_apellidos, usm_password, usm_email, usm_estado, usm_fecha_ingreso, usm_campo_1)
    VALUES($1, $2, $3, $4, $5, 'INACTIVO', CURRENT_DATE, 'CIUDADANO')`
    const nuevo_usuario = await pool2.query(query, [cedula, nombres, apellidos, password, email])
    console.log("Usuario registrado correctamente")
}

async function actualizar_Estado_Usuario(cedula)
{
    const query = `UPDATE corp.tbl_usuarios_municipalidad SET usm_estado = 'ACTIVO' WHERE usm_cedula = $1`
    const actualizacion = await pool2.query(query, [cedula])
    console.log("Registro actualizado")
}

async function Obtener_Usuario_By_Cedula(cedula)
{
    const query = `SELECT * FROM corp.tbl_usuarios_municipalidad WHERE usm_cedula = $1`
    const seleccionar = await pool2.query(query, [cedula])
    return seleccionar.rows[0];
}

async function Obtener_Todos_los_Usuarios()
{
    const query = `SELECT * FROM corp.tbl_usuarios_municipalidad`
    const respuesta = await pool2.query(query);
    return respuesta;
}

async function ObtenerTransacciones(nombre_app)
{
    const query = `SELECT a.trm_nombre from corp.tbl_transacciones_municipalidad a 
    INNER JOIN corp.tbl_modulos_municipalidad b ON a.mom_id_modulo = b.mom_id_modulo 
    INNER JOIN corp.tbl_aplicaciones_municipalidad c ON b.apm_codigo = c.apm_codigo 
    WHERE c.apm_codigo = $1`
    const transacciones = await pool2.query(query, [nombre_app]);
    const format = utilService.formatAtribuciones(transacciones.rows)
    return format;
}

async function Insertar_CodigoValidador(id_ciudadano, codigo_gen)
{
    const query = `INSERT INTO corp.tbl_codigos_login(codlog_id_ciudadano, codlog_codigo_gen, codlog_fecha_hora, codlog_activo) 
                   VALUES($1, $2, current_timestamp, true)`
    const respuesta = await pool2.query(query,[id_ciudadano, codigo_gen])
}

async function ObtenerCodigoVerificador(id_ciudadano, codigo)
{
    const query = `SELECT * FROM corp.tbl_codigos_login WHERE codlog_id_ciudadano = $1 AND codlog_codigo_gen = $2 and codlog_fecha_hora::date = current_date`
    const respuesta = await pool2.query(query,[id_ciudadano, codigo])
    return respuesta.rows
}

async function ObtenerCodigoVerificadorTemporizado(id_ciudadano)
{
    const query = `SELECT * FROM corp.tbl_codigos_login WHERE codlog_id_ciudadano = $1 AND
                   codlog_activo = true AND
                   codlog_fecha_hora::date = current_date AND 
                   EXTRACT(HOUR from codlog_fecha_hora) - EXTRACT(HOUR from current_timestamp) = 0 AND
                   EXTRACT(MINUTE from current_timestamp) - EXTRACT(MINUTE from codlog_fecha_hora) <= 2`
    const respuesta = await pool2.query(query,[id_ciudadano])
    
    if (respuesta.rowCount != 0) 
    {
        return respuesta.rows[0]
    }else
    {
        return ''
    }
}

async function ActualizarEstadoCodigoVerificadorByCiudadano(id_ciudadano)
{
    const query = `UPDATE corp.tbl_codigos_login SET codlog_activo = false where codlog_id_ciudadano = $1 AND
                   codlog_fecha_hora::date = current_date`
    const respuesta = await pool2.query(query,[id_ciudadano])
}

module.exports = {
    insertNuevoUsuario,
    actualizar_Estado_Usuario,
    Obtener_Usuario_By_Cedula,
    Obtener_Todos_los_Usuarios,
    ObtenerTransacciones,
    Insertar_CodigoValidador,
    ObtenerCodigoVerificador,
    ObtenerCodigoVerificadorTemporizado,
    ActualizarEstadoCodigoVerificadorByCiudadano
}