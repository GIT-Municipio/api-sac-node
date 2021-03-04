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

//-----------PACS---------------------------------------
async function ObtenerPAC(anio, cod_dep)
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_pac WHERE
                       pac_anio = $1 AND
                       pac_cod_dep = $2`
        const pac = await pool2.query(query, [anio, cod_dep])
        return pac.rows[0]
    } catch (error) 
    {
        console.log(error)
    }
}

async function ObtenerPACsPorDepartamento(cod_departamento)
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_pac WHERE pac_cod_dep = $1`
        const pac = await pool2.query(query,[cod_departamento])
        return pac.rows[0]
    } catch (error) 
    {
        console.log(error)    
    }
}

async function ObtenerTodosLosPACs()
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_pac`
        const  pacs = await pool2.query(query)
        return pacs.rows
    } catch (error) 
    {
        console.log(error)
    }
}

async function CrearPAC(anio, cod_dep, mision)
{
    try 
    {
        const query = `INSERT INTO public_compras.tbl_pac(pac_anio, pac_cod_dep, pac_mision) 
                       VALUES($1, $2, $3)`
        await pool2.query(query, [anio, cod_dep, mision])
    } catch (error)
    {
        console.log(error)
    }
    
}
//---------------------Detalles PACS--------------------
async function Obtener_Detalles_PAC_Por_Departamento(cod_departamento)
{
    try 
    {
        const  query = `SELECT * FROM public_compras.tbl_pac_detalle WHERE pacd_cod_dep_p = $1`
        const detalles_pac = await pool2.query(query, [cod_departamento])
        return detalles_pac.rows   
    } catch (error) 
    {
        console.log(error)
    }
}

async function Obtener_Detalles_PAC_Por_Padre_PAC(anio, cod_departamento)
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_pac_detalle WHERE 
                       pacd_cod_dep_p = $1 AND
                       pacd_anio_p = $2`
        const detalles_pac = await pool2.query(query, [cod_departamento, anio])
        return detalles_pac.rows
    } catch (error) 
    {
        console.log(error)
    }
}

module.exports = {
    ObtenerUsuarioAdministrador,
    ObtenerPAC,
    ObtenerPACsPorDepartamento,
    ObtenerTodosLosPACs,
    CrearPAC,
    Obtener_Detalles_PAC_Por_Departamento,
    Obtener_Detalles_PAC_Por_Padre_PAC
}