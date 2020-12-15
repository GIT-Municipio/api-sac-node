const Pool = require('pg').Pool

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
    const query = `INSERT INTO corp.tbl_usuarios_municipalidad (usm_cedula, usm_nombres, usm_apellidos, usm_password, usm_email, usm_estado)
    VALUES($1, $2, $3, $4, $5, $6)`
    const nuevo_usuario = await pool2.query(query, [cedula, nombres, apellidos, password, email, 'INACTIVO'])
    return nuevo_usuario
}

module.exports = {
    insertNuevoUsuario
}