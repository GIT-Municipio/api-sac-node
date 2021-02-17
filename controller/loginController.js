const usuariosTransaction = require('../models/easyseguridad/UsuariosTransaction')
const usuarios_nuevos = require('../models/usuarios/modelo_usuarios')
const send_email = require('../services/mensajeriaService')
const tokenService = require('../services/tokenService')
const carpetas = require('../services/documentosService')
const documentos = require('../models/usuarios/modelo_carpetas_usuarios')
const carpeta_ciudadano = require('../models/usuarios/modelo_carpetas_usuarios')

//variables para pasar datos del ciudadano
var usua_usuario_nombres;
var usua_usuario_appeliidos;
var usua_usuario_cedula;

//numero comprobador de dos pasos
var num_comprobador;

async function login (req, res) {
  const nombrecorto = req.body.usuario
  const password = req.body.password
  const codigoApp = req.body.codigoApp
  if (nombrecorto === undefined || password === undefined || codigoApp === undefined) {
    res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: usuario, password, codigoApp.' })
  }
  try {
    const respuesta = await usuariosTransaction.login(nombrecorto, password, codigoApp)
    res.status(200).send(respuesta)
  } catch (err) {
    console.log(err)
    res.status(500).send({ mensaje: err.message })
  }
}

async function login_ciudadano(req, res)
{
  const cedula = req.body.cedula;
  const password = req.body.password;

  if(cedula == "" || password == "")
  {
    res.status(200).send({ mensaje: 'Por favor envíe los parametros requeridos: cedula y contraseña' })
  }else
  {
    try
    {
      const respuesta = await usuarios_nuevos.Obtener_Usuario_By_Cedula(cedula);
      if(respuesta!='')
      {
        if(respuesta.usm_password == password && respuesta.usm_estado == 'ACTIVO')
        {
          //actualizacion de codigos de verificacion
          await usuarios_nuevos.ActualizarEstadoCodigoVerificadorByCiudadano(cedula)
          
          //numero aleatorio para la comprobacion en dos pasos
          num_comprobador = Math.round(Math.random()*(9999 - 1000)+1000)
          await usuarios_nuevos.Insertar_CodigoValidador(cedula, num_comprobador)

          //envio de numero comprobador a email
          const email_emitente = 'rchistoso@gmail.com'
          const asunto = 'Municipio de Cotacachi - Código de seguridad'
          const cuerpo = "Sistema automatico de dos pasos de Cotacachi"+
                         "<br><br> <img style='left: 40%;' src='http://www.cotacachienlinea.gob.ec/sip_gd/imgs/logos/mail.png' width='200' /> <br><br>"+
                         "<h2>Su codigo de verificación es "+num_comprobador+"</h2>";

          await send_email.Enviar_Emial(email_emitente, respuesta.usm_email, asunto, cuerpo)

          //asignacion de datos a las variables
          usua_usuario_nombres = respuesta.usm_nombres
          usua_usuario_appeliidos = respuesta.usm_apellidos
          usua_usuario_cedula = respuesta.usm_cedula

          res.status(200).send({mensaje:"OK-paso1", ciu_cedula: respuesta.usm_cedula})
        }else
        {
          res.status(200).send({mensaje:"CREDENCIALES INCORRECTAS O USUARIO ACTUALMENTE INACTIVO"})
        }
      }else
      {
        res.status(200).send({mensaje:"USUARIO NO REGISTRADO"})
      }
    }catch(error)
    {
      res.status(500).send({mensaje: error.message})
    }
  }
}

async function login_ciudadano_paso_dos(req, res)
{
  const codigo = req.body.codigo
  const identificacion = req.body.identificacion
  try 
  {
    //OBTENEMOS EL CODIGO VERIFDICADOR DEL USUARIO
    const codigoVerificador = await usuarios_nuevos.ObtenerCodigoVerificadorTemporizado(identificacion)

    if(codigoVerificador != '')
    {
      //VERIFICAMOS SI EL CODIGO INGRESADO ES EL CORRECTO
      if(codigoVerificador.codlog_codigo_gen == codigo)
      {
        const ruta_carpeta = await carpeta_ciudadano.obtener_carpeta_principal_BYCedulaCiu(identificacion)
        const token = tokenService.generarToken(usua_usuario_nombres)
        const transacciones = await usuarios_nuevos.ObtenerTransacciones('PCW');
  
        res.status(200).send({mensaje: 'OK', 
                              transacciones: transacciones, 
                              token: token, 
                              usuario_nombres: usua_usuario_nombres,
                              usuario_appeliidos: usua_usuario_appeliidos, 
                              usuario_cedula: identificacion,
                              ruta_carpeta: ruta_carpeta.pfc_ruta_folderpricipal,
                            })
      }else
      {
        res.status(200).send({mensaje: 'NO-CODIGO'})
      }
    }else
    {
      res.status(200).send({mensaje: 'TIEMPO-FUERA'})
    }
  } catch (error) 
  {
    res.status(500).send({mensaje: error.message}) 
  }
}

async function insertNuevoUsuario(req, res)
{
    const cedula = req.body.cedula
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const password = req.body.password
    const email = req.body.email

    //parametros del enviador de emails
    const email_emitente = 'rchistoso@gmail.com'
    const asunto = 'Activacion de usuario nuevo registrado'
    const cuerpo = "Gracias por registrarse en los servicios web del Gad Municipal de Santa Ana de Cotacachi, para continuar con el registro por favor haga click en el siguiente enlace:"+
                  "<br><br> <img style='left: 40%;' src='http://www.cotacachienlinea.gob.ec/sip_gd/imgs/logos/mail.png' width='200' /> <br><br>"+
                  "<a href='http://localhost:4200/activar-cuenta/"+cedula+"'> Activar cuenta... </a>";
    try 
    {
        const respuesta = await usuarios_nuevos.insertNuevoUsuario(cedula,nombres,apellidos,password,email)
        await send_email.Enviar_Emial(email_emitente, email, asunto, cuerpo)

        //creación de carpeta personal del usuario registrado
        var ruta = carpetas.crearCarpetaUsuario(cedula)
        documentos.insertar_nuevo_carpeta_principal(cedula, ruta)

        res.status(200).send({mensaje:'OK-nuevo-usuario',estado:'USUARIO REGISTRADO CORRECTAMENTE'})
    } catch (error) 
    {
        console.log(error)
        res.status(500).send({mensaje:'NO-nuevo-usuario'})
    }
}

async function Activar_Usuario(req, res)
{
  const cedula = req.params.cedula
  try
  {
    const respuesta = await usuarios_nuevos.Obtener_Usuario_By_Cedula(cedula);
    if(respuesta!='' && respuesta.usm_estado == 'INACTIVO')
    {
      await usuarios_nuevos.actualizar_Estado_Usuario(cedula);
      res.status(200).send({ mensaje: 'OK', estado: 'USUARIO ACTIVADO' })
    }else
    {
      res.status(200).send({ mensaje:'NO' ,estado: 'USUARIO NO REGISTRADO O ACTUALMENTE ACTIVO' })
    }
  } catch(error)
  {
    console.log("HA OCURRIDO UN ERROR")
    console.log(error)
    res.status(500).send({mensaje:error.message})
  }
}

async function ObtenerAllUusarios(req, res)
{
  try
  {
    const respuesta = await usuarios_nuevos.Obtener_Todos_los_Usuarios()
    res.status(200).send(respuesta)
  }catch(error)
  {
    console.log(error)
    res.status(500).send({mensaje:error.message})
  }
}

async function TranaccionesCiudanos(req, res)
{
  try
  {
    respuesta = await usuarios_nuevos.ObtenerTransacciones('PCW')
    res.status(200).send(respuesta)
  }catch(error)
  {
    res.status(500).send({mensaje: error.message})
  }
}

module.exports = {
  login,
  insertNuevoUsuario,
  Activar_Usuario,
  ObtenerAllUusarios,
  TranaccionesCiudanos,
  login_ciudadano,
  login_ciudadano_paso_dos
} 
