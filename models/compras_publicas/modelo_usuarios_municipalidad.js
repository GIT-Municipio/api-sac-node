const {sgd} = require('../../config/pg_conecciones')

async function ObtenerUsuarioMunicipalidadByCedula(cedula)
{
    try 
    {
        const query = `SELECT * FROM tblu_migra_usuarios WHERE usua_cedula = $1`
        const respuesta = await sgd.query(query, [cedula])
        return respuesta.rows[0]    
    } catch (error) 
    {
        console.log(error)    
    }
    
}

async function ObtenerJefeDepartamentoByIdDepartamento(id_dep)
{
    try 
    {
        const query = `select * from tblu_migra_usuarios where cod_depenid = $1 and 
                   usua_cargo like 'Jefe%'`
        const respuesta = await sgd.query(query, [id_dep])
        return respuesta.rows[0]
    } catch (error) 
    {
        console.log(error)
    }
    
}

module.exports = {
    ObtenerUsuarioMunicipalidadByCedula,
    ObtenerJefeDepartamentoByIdDepartamento
}