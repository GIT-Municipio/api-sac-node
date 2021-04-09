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

async function ObtenerAniosPAC()
{
    try 
    {
        const query = `SELECT pac_anio FROM public_compras.tbl_pac GROUP BY pac_anio`  
        const anios = await pool2.query(query)  
        return anios.rows
    } catch (error) 
    {
        console.log(error)
    }
}
//---------------------Detalles PACS--------------------

async function Crear_Detalle_PAC(anio_p, cod_dep, cod_frm, obj_pnbv, obj_pdot, partida_nombre, proyecto_actividad, obj_general, indicador_gestion, meta_gestion, tmp_estimado, presupuesto, estado)
{
    try 
    {
        const query = `INSERT INTO public_compras.tbl_pac_detalle(pacd_anio_p, pacd_cod_dep_p, pacd_frm_cod_p, 
                       pacd_obj_pnbv, pacd_obj_pdot, pacd_partida_nombre, pacd_proyecto_actividiad, pacd_obj_general, 
                       pacd_indicador_gestion, pacd_meta_gestion, pacd_tiempo_estimado, pacd_presupuesto, 
                       pacd_estado, pacd_progra_i, pacd_progra_ii, pacd_progra_iii, pacd_progra_iv)
                       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,false,false,false,false)`  
        await pool2.query(query, [anio_p, cod_dep, cod_frm, obj_pnbv, obj_pdot, partida_nombre, proyecto_actividad, obj_general, indicador_gestion, meta_gestion, tmp_estimado, presupuesto, estado])
    } catch (error) 
    {
        console.log(error)
    }
}

async function Obtener_Dettale_PAC(pacd_id)
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_pac_detalle WHERE pacd_id = $1`
        const detalle = await pool2.query(query,[pacd_id])
        return detalle.rows[0]    
    } catch (error) 
    {
        console.log(error)
    }
}

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

//---------------------PROCESOS-------------------

async function GenerarNumeroCodigoTemporal()
{
    try 
    {
        const query = `SELECT COUNT(*) FROM public_compras.tbl_procesos`
        const numero = pool2.query(query)
        const codigo = 'temporal-'+numero[0]
        console.log(codigo)
    } catch (error) 
    {
        console.log(error)    
    }
}

/*async function CrearProceso()
{
    try 
    {
        const query = `INSERT INTO public_compras.tbl_procesos(proc_tmp_cod, proc_org_num, proc_codigo_frm_p, proc_id_est_p, proc_usuario_p, proc_fecha, 
            proc_obj_contractual, proc_subtotal, proc_iva_cero, proc_iva, proc_valor_total, proc_forma_pago,
            proc_dias_plazo, proc_garantias, proc_cpc, proc_detalle, proc_dir_carpeta)
            VALUES()`    
    } catch (error) 
    {
        console.log(error)
    }
}*/

async function ObtenerProcesosAprobados()
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_procesos WHERE proc_tmp_cod <> proc_org_num`
        const procesos = await pool2.query(query)
        return procesos.rows
    } catch (error) 
    {
        console.log(error)
    }
}

async function ObtenerProcesosNoAprobados()
{
    try 
    {
        const query = `SELECT * FROM public_compras.tbl_procesos WHERE proc_tmp_cod = proc_org_num`
        const procesos = await pool2.query(query)
        return procesos.rows    
    } catch (error) 
    {
        console.log(error)
    }
}

module.exports = {
    ObtenerUsuarioAdministrador,
    //PACS
    ObtenerPAC,
    ObtenerPACsPorDepartamento,
    ObtenerTodosLosPACs,
    CrearPAC,
    ObtenerAniosPAC,
    //Detalles PAC
    Crear_Detalle_PAC,
    Obtener_Dettale_PAC,
    Obtener_Detalles_PAC_Por_Departamento,
    Obtener_Detalles_PAC_Por_Padre_PAC,
    //Procesos
    ObtenerProcesosAprobados,
    ObtenerProcesosNoAprobados
}