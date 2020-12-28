const Pool = require('pg').Pool
const utilService = require('../../services/utilService')

//Base de datos de prueba local
const pool2 = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bdd_core_municipalidad',
    password: '1459',
    port: 5432
})

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

module.exports = {
    insertNuevoUsuario,
    actualizar_Estado_Usuario,
    Obtener_Usuario_By_Cedula,
    Obtener_Todos_los_Usuarios,
    ObtenerTransacciones
}