const {pool2} = require('../../config/pg_conecciones')

async function insertar_nuevo_carpeta_principal(cedula, ruta)
{
    const query = 'INSERT INTO dociu.tbl_principal_folder_ciudadano(pfc_id_ciudadano, pfc_ruta_folderpricipal) VALUES($1,$2)'
    const nuevo_folderprincipal = await pool2.query(query, [cedula, ruta])
    console.log("Carpeta de usuario creada en: "+ruta)
}

async function obtener_carpeta_principal_BYCedulaCiu(cedula)
{
    const query = `SELECT * FROM dociu.tbl_principal_folder_ciudadano WHERE pfc_id_ciudadano = $1`
    const ruta_carpeta = await pool2.query(query,[cedula])
    return ruta_carpeta.rows[0]
}

async function insertar_archivo_ciudadano(cedulaCiu, tipoarchivoID, nombreArchivo, rutaArchivo)
{
    const query = `INSERT INTO dociu.tbl_archivos_ciudadano(arci_id_ciudadano_p, arci_id_tipo_archivo_p, arci_nombre_archivo, arci_fecha_subida, arci_ruta_archivo) 
                   VALUES($1, $2, $3, CURRENT_DATE, $4)`
    const nuevo_archivo = await pool2.query(query,[cedulaCiu,tipoarchivoID,nombreArchivo,rutaArchivo])
    console.log('Archivo registrado')
}

async function Obtener_All_tipos_Archivos()
{
    const query = 'SELECT * FROM dociu.tbl_tipo_archivo_ciudadano'
    const tipo_archivos = await pool2.query(query)
    return tipo_archivos.rows
}

module.exports = { 
    insertar_nuevo_carpeta_principal,
    obtener_carpeta_principal_BYCedulaCiu,
    insertar_archivo_ciudadano,
    Obtener_All_tipos_Archivos
}