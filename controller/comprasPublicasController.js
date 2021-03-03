const usua_municipio = require('../models/compras_publicas/modelo_usuarios_municipalidad')
const administrador = require('../models/compras_publicas/modelo_compras_publicas')

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
                    const admin = await administrador.ObtenerUsuarioAdministrador(cedula)
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

module.exports = {
    Login_Usuario_Municipio,
    Login_Usuario_Administrador
}