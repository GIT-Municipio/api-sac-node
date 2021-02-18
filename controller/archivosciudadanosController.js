const e = require('express')
const archivos_ciu = require('..//models/usuarios/modelo_carpetas_usuarios')

async function subirArchivo(req, res)
{
    const cedulaCiu = req.body.cedulaCiu
    const tipoarchivoId = req.body.tipoarchivoId
    const nombreArchivo = req.body.nombreArchivo
    const rutaArchivo = req.body.rutaArchivo
    let archivo = req.files.archivo

    try 
    {
        await archivo.mv(rutaArchivo+"\\"+archivo.name)
        await archivos_ciu.insertar_archivo_ciudadano(cedulaCiu,tipoarchivoId,nombreArchivo,rutaArchivo+"\\"+archivo.name)
        res.status(200).send({mensaje:'Archivo subido exitosamente'})
    } catch (error) 
    {
        res.status(500).send({mensaje:error.message})
    }
}

async function ObtenerTiposArchivos(req, res)
{
    try 
    {
        const tip_archivos = await archivos_ciu.Obtener_All_tipos_Archivos()
        res.status(200).send(tip_archivos)   
    } catch (error) 
    {
        res.status(500).send({mensaje:error.message})    
    }
}

module.exports = {
    ObtenerTiposArchivos,
    subirArchivo
}