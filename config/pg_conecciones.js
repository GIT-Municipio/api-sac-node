const {Pool} = require('pg');

//Coneccion a la base de datos de usuarios ciudadania
const pool2 = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bdd_core_municipalidad',
    password: 'postgres',
    port: 5432
})

//Coneccion a la base de gestion documental
const sgd = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bdd_sip_sgd',
    password: 'postgres',
    port: 5432
})

module.exports = {
    pool2,
    sgd
}