
const connections_params = {
  postgres: {
      user: 'postgres', //db user
      host: 'localhost', //db host etc: 127.0.0.1
      database: 'bdd_core_municipalidad', //db name
      password: 'postgres', // password
      port: 5432, // db port etc: 5432 for postgresql
      dialect: 'mssql'
  },
  sincronizador: {
    server: '192.168.236.245',
    database: 'ITE_SincronizacionInformacionSap',
    user: 'sa',
    password: '61Marcelo',
    dialect: 'mssql'
  },
  integrador_sap: {
    server: '192.168.236.242',
    database: 'ITE_IntegradorSap',
    user: 'sa',
    password: 'sqlfarma',
    dialect: 'mssql'
  },
  easy_contabilidad: {
    server: '192.168.251.178',
    database: 'EasyContabilidad',
    user: 'sa',
    password: 'sqlfarma',
    dialect: 'mssql'
  },
  easy_seguridad: {
    server: '192.168.236.245',
    database: 'PruebaEasySeguridad',
    user: 'sa',
    password: '61Marcelo',
    dialect: 'mssql'
  },
  easy_gestion: {
    server: '192.168.251.178',
    database: 'EasygestionEmpresarial',
    user: 'sa',
    password: 'sqlfarma',
    dialect: 'mssql'
  },
  bd_general: {
    server: 'localhost',
    database: 'bdd_core_municipalidad',
    user: 'postgres',
    password: 'postgres',
    dialect: 'mssql'
  }
}

module.exports = connections_params

