const usua_municipio = require('../models/compras_publicas/modelo_usuarios_municipalidad')

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
            if(usuario != '')
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

module.exports = {
    Login_Usuario_Municipio
}