const usua_municipio = require('../models/compras_publicas/modelo_usuarios_municipalidad')
const compras_publicas = require('../models/compras_publicas/modelo_compras_publicas')

/////////LOGINS DE USUARIOS Y ADMINISTRADORES///////////////////
async function Login_Usuario_Municipio(req, res)
{
    const cedula = req.body.cedula
    const pasw = req.body.pasw

    try 
    {
        if(cedula == "" || pasw == "")
        {
            res.status(200).send({mensaje: 'INGRESE LAS CREDENCIALES CORRECTAS'})
        }else
        {
            const usuario = await usua_municipio.ObtenerUsuarioMunicipalidadByCedula(cedula)
            if(usuario !== undefined)
            {
                if(usuario.usua_pasw == pasw)
                {
                    const jefe_superior = await usua_municipio.ObtenerJefeDepartamentoByIdDepartamento(usuario.cod_depenid)
                    
                    res.status(200).send({mensaje: 'OK-Usua-Muni',
                                          cedula: usuario.usua_cedula,
                                          nombres: usuario.usua_nomb,
                                          apellidos: usuario.usua_apellido,
                                          departamento: usuario.cod_depenid,
                                          jefe: jefe_superior.usua_cedula
                                        })
                }else
                {
                    res.status(200).send({mensaje: 'CREDENCIALES INCORRECTAS'})
                }
            }else
            {
                res.status(200).send({mensaje: 'USUARIO NO REGISTRADO'})
            }
        }
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})    
    }
}

async function Login_Usuario_Administrador(req, res)
{
    const cedula = req.body.cedula
    const pasw = req.body.pasw

    try 
    {
        if(cedula == "" || pasw == "")
        {
            res.status(200).send({mensaje: 'INGRESE LAS CREDENCIALES CORRECTAS'})
        }else
        {
            const usuario = await usua_municipio.ObtenerUsuarioMunicipalidadByCedula(cedula)
            if(usuario !== undefined)
            {
                if(usuario.usua_pasw == pasw)
                {
                    const admin = await compras_publicas.ObtenerUsuarioAdministrador(cedula)
                    if(admin !== undefined)
                    {
                        if(admin.adm_activo == true)
                        {
                            res.status(200).send({mensaje: 'Ok-Usua-Adm',
                                                  cedula: usuario.usua_cedula,
                                                  nombres: usuario.usua_nomb,
                                                  apellidos: usuario.usua_apellido,
                                                  departamento: usuario.cod_depenid,
                                                })
                        }else
                        {
                            res.status(200).send({mensaje: 'ADMINISTRADOR ACTUALMENTE INACTIVO'})
                        }
                    }else
                    {
                        res.status(200).send({mensaje: 'NO ES USUARIO ADMINISTRADOR'})
                    }
                }
            }else
            {
                res.status(200).send({mensaje: 'USUARIO NO REGISTRADO'})
            }
        }
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})    
    }
}

/////////////PACS/////////////
async function ObtenerPAC(req, res)
{
    const anio = req.params.anio
    const cod_dep = req.params.cod_dep
    try 
    {
        const pac = await compras_publicas.ObtenerPAC(anio, cod_dep)
        if(pac !== undefined)
        {
            res.status(200).send({pac: pac})
        }else
        {
            res.status(200).send({mensaje: 'No se ha encontrado el pac indicado'})
        }
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})    
    }
}

async function ObtenerPACs(req, res)
{
    try 
    {
        const pacs = await compras_publicas.ObtenerTodosLosPACs()
        res.status(200).send({pacs: pacs})
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message}) 
    }
}

async function ObtenerPACs_por_Departamento(req, res)
{
    const cod_dep = req.params.cod_dep
    try 
    {
        const pacs = await compras_publicas.ObtenerPACsPorDepartamento(cod_dep)
        if(pacs !== undefined)
        {
            res.status(200).send({pacs: pacs})
        }else
        {
            res.status(200).send({mensaje: 'No se encontraron PACs para este deprtamento'})
        }
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})
    }
}

async function CrearPAC(req, res)
{
    const anio = req.body.anio
    const cod_dep = req.body.cod_dep
    const mision = req.body.mision

    try 
    {
        await compras_publicas.CrearPAC(anio, cod_dep, mision)
        res.status(200).send({mensaje: 'PAC creado exitosamente'})  
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})
    }
}

async function ObtenerAniosPAC(req, res)
{
    try 
    {
        const anios = await compras_publicas.ObtenerAniosPAC()
        res.status(200).send({anios: anios})   
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})
    }
}

///////////////////Detalles PAC////////////

async function CrearDetallePAC(req, res)
{
    const anio_p = req.body.anio_p
    const cod_dep = req.body.cod_dep
    const cod_frm = req.body.cod_frm
    const obj_pnbv = req.body.obj_pnbv
    const obj_pdot = req.body.obj_pdot
    const partida_nombre = req.body.partida_nombre
    const proyecto_actividad = req.body.proyecto_actividad
    const obj_general = req.body.obj_general
    const indicador_gestion = req.body.indicador_gestion
    const meta_gestion = req.body.meta_gestion
    const tmp_estimado = req.body.tmp_estimado
    const presupuesto = req.body.presupuesto
    const estado = req.body.estado

    try 
    {
        await compras_publicas.Crear_Detalle_PAC(anio_p, cod_dep, cod_frm, obj_pnbv, obj_pdot, partida_nombre, proyecto_actividad, obj_general, indicador_gestion, meta_gestion, tmp_estimado, presupuesto, estado)  
        res.status(200).send({mensaje: 'Detalle PAC Creado Exitosamente'})
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})
    }
}

async function ObtenerDetallePAC(req, res)
{
    const pacd_id = req.body.pacd_id
    try 
    {
        const detalle = await compras_publicas.Obtener_Dettale_PAC(pacd_id)
        if(detalle !== undefined)
        {
            res.status(200).send({Detalle_PAC: detalle})
        }else
        {
            res.status(200).send({mensaje: 'No se encontro el detalle PAC indicado'})
        }    
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})    
    }
}

async function ObtenerDetallesPACporDepartamento(req, res)
{
    const cod_dep = req.body.cod_dep
    try 
    {
        const detalles = await compras_publicas.Obtener_Detalles_PAC_Por_Departamento(cod_dep)
        res.status(200).send({Detalles_PAC: detalles})    
    } catch (error) 
    {
        res.status(500).send({mensaje: error.message})
    }
}

module.exports = {
    //logins
    Login_Usuario_Municipio,
    Login_Usuario_Administrador,
    //PAC
    ObtenerPAC,
    ObtenerPACs,
    ObtenerPACs_por_Departamento,
    CrearPAC,
    ObtenerAniosPAC,
    //Detalles PAC
    CrearDetallePAC,
    ObtenerDetallePAC,
    ObtenerDetallesPACporDepartamento
}