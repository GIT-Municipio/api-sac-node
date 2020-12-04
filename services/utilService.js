const requestIp = require('request-ip')
// const url = require("url");

function getFormatIp (req) {
  var clientIp = requestIp.getClientIp(req)
  return clientIp
}

function buildInfoLog (tbl_origen, accion, mensaje, ip, usuario, tipo) {
  const data = {
    accion: accion,
    tipo: tipo,
    objeto: tbl_origen,
    mensaje: mensaje,
    ip: ip,
    usuario: usuario
  }
  return data
}

function buildLog (req, mensaje, tipo) {
  const data = {
    // accion: url.parse(req.url).pathname,
    accion: req.originalUrl,
    tipo: tipo,
    objeto: req.body.tabla,
    mensaje: mensaje,
    ip: getFormatIp(req),
    usuario: 'mmatango'
  }
  return data
}

function formatAtribuciones (array) {
  const conjunto = new Set()
  const array_distinct = new Array()
  array.map((obj, idx, array) => {
    if (!conjunto.has(obj.modulo)) {
      conjunto.add(obj.modulo)
      array_distinct.push(obj)
    }
  })
  // let array_distinct = Array.from(conjunto);
  let obj_modulo = {}
  let obj_res = {}
  let array_atribuciones = new Array()
  const array_modulos = new Array()
  array_distinct.map((modulo, idx1, array1) => {
    obj_modulo = { nombre: modulo.modulo, descripcion: modulo.mom_nombre_modulo }
    array_modulos.push(obj_modulo)
    array.map((obj2, idx2, array2) => {
      if (modulo.modulo === obj2.modulo) {
        obj_res = { nombre: obj2.transaccion, descripcion: obj2.trm_nombre }
        array_atribuciones.push(obj_res)
      }
      array_modulos[idx1].transacciones = array_atribuciones
    })
    array_atribuciones = []
  })
  return { modulos: array_modulos }
}

module.exports = {
  getFormatIp,
  buildInfoLog,
  buildLog,
  formatAtribuciones
}
