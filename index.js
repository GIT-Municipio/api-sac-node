const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
var cors = require('cors')
const db = require('./queries')

const inicio = require('./controller/loginController')
const pagos = require('./controller/pagosController')
const tramites = require('./controller/tramitesController')
const biblioteca = require('./controller/bibliotecaController')
const archivos_ciudadano = require('./controller/archivosciudadanosController')
const compras_publicas = require('./controller/comprasPublicasController')

const app = express()
const port = 3000

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )
    //test commit
    //prueba segunod commit

// Bayardo Guerrero - 2020

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postgres API' })
})

app.post('/login', inicio.login)
app.post('/pagos/insertPago', pagos.insertRegistro)
app.post('/pagos/getAllPagosByEstado', pagos.getAllPagosByEstado)
app.post('/pagos/updatePagos', pagos.updateRegistro)
app.post('/pagos/saveFile', pagos.saveFile)
app.post('/tramites/getTramitesById', tramites.getTramitesById)
app.get('/tramites/getTramitesAll', tramites.getTramitesAll)
app.post('/tramites/getRequisitosByTramiteId', tramites.getRequisitosByTramiteId)
app.post('/tramites/getRecorridoTramiteByTramite', tramites.getRecorridoTramiteByTramite)
app.post('/tramites/getTramitesByTramiteId', tramites.getTramitesByTramiteId)
app.post('/tramites/getDocumentoById', tramites.getDocumentoById)

//RUTAS USUARIOS MUNICIPALIDAD y COMPRAS PUBLICAS
app.post('/login/loginMunicipio', compras_publicas.Login_Usuario_Municipio)
app.post('/login/loginAdmin', compras_publicas.Login_Usuario_Administrador)
app.get('/pac/:anio/:cod_dep', compras_publicas.ObtenerPAC)
app.get('/pacs', compras_publicas.ObtenerPACs)
app.get('/pacs/departamento/:cod_dep', compras_publicas.ObtenerPACs_por_Departamento)
app.post('/pac/crearPAC', compras_publicas.CrearPAC)
app.get('/pac/anios', compras_publicas.ObtenerAniosPAC)
app.post('/det-pac/nuevo', compras_publicas.CrearDetallePAC)

//RUTAS USUARIOS CIUDADANO
app.post('/login/nuevoUsuario', inicio.insertNuevoUsuario)
app.get('/login/cambiarEstado/:cedula', inicio.Activar_Usuario)
app.get('/login/getTransaccionesCiudadanas', inicio.TranaccionesCiudanos)
app.post('/login-ciudadano', inicio.login_ciudadano)
app.post('/login-ciudadano/paso-dos', inicio.login_ciudadano_paso_dos)

//RUTAS CARPETAS Y ARCHIVOS CIUDADANO
app.get('/getTiposArchivos', archivos_ciudadano.ObtenerTiposArchivos)
app.post('/archivos-ciudadano/subir-archivo', archivos_ciudadano.subirArchivo)

app.post('/biblioteca/insertRecurso', biblioteca.insertRecurso)
app.post('/biblioteca/getAllRecursosByEstado', biblioteca.getAllRecursosByEstado)
app.post('/biblioteca/getRecursoById', biblioteca.getRecursoById)
app.post('/biblioteca/insertPrestamo', biblioteca.insertPrestamo)
app.post('/biblioteca/getAllPrestamosByEstado', biblioteca.getAllPrestamosByEstado)
app.post('/biblioteca/updatePrestamo', biblioteca.updatePrestamo)

app.get("/pagos/getFile", (req, res) => {
    let file = req.query.nombre;
    res.sendFile("C:/registros/" + file);
});
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})