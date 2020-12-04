var winston = require('winston')
var moment = require('moment')

const loggerError = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'log/error.log',
      level: 'error'
    })
  ]
})

//= =================================  MIS FUNCIONES =================================
function logError (title, mensaje) {
  const horaActual = moment().format('YYYY-MM-DD HH:mm:ss')
  loggerError.error(mensaje, { service: title, timestamp: horaActual })
}

module.exports = {
  logError
}
