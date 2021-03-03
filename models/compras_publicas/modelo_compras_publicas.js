const {pool2} = require('../../config/pg_conecciones')

async function ObtenerUsuarioAdministrador(cedula)
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_administradores WHERE adm_usuario = $1`
        const administrador = await pool2.query(query, [cedula])
        return administrador.rows[0]    
    } catch (error) 
    {
        console.log(error)    
    }
}

async function ObtenerPACsPorDepartamento(cod_departamento)
{
    try 
    {
        const query = ``
    } catch (error) 
    {
        console.log(error)    
    }
}

module.exports = {
    ObtenerUsuarioAdministrador
}