const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const inicio = require('./controller/loginController')
const pagos = require('./controller/pagosController')
const tramites = require('./controller/tramitesController')
var cors = require('cors')

app.use(cors())
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

// app.get('/vehicles',db.getAllVehicleDisplay)
// app.get('/vehicle/:id',db.getVehicleDisplayById)
// app.post('/login',db.getAtribuciones)
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

app.get("/pagos/getFile", (req, res) => {
    let file = req.query.nombre;
    res.sendFile("C:/registros/" + file);
});
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})