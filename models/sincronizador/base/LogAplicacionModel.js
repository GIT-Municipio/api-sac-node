const Sequelize = require('sequelize')
const sequelize = require('../../../db/sincronizadorConn')

class LogAplicacionModel extends Sequelize.Model {}
LogAplicacionModel.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'log_id' },
  accion: { type: Sequelize.STRING(100), allowNull: false, field: 'log_accion' },
  tipo: { type: Sequelize.STRING(30), allowNull: false, field: 'log_tipo' },
  objeto: { type: Sequelize.STRING(100), allowNull: true, field: 'log_objeto' },
  mensaje: { type: Sequelize.TEXT, allowNull: false, field: 'log_mensaje' },
  ip: { type: Sequelize.STRING(30), allowNull: true, field: 'log_ip' },
  usuarioSolicitante: { type: Sequelize.STRING(60), allowNull: true, field: 'log_usuario_solicitante' },
  fechaCreacion: { type: Sequelize.DATE, allowNull: false, field: 'log_fecha_creacion' }
}, {
  modelName: 'LogAplicacionModel',
  tableName: 'tbl_log_Aplicacion',
  timestamps: true,
  createdAt: 'fechaCreacion',
  updatedAt: false,
  schema: 'sinc',
  sequelize
})

module.exports = {
  LogAplicacionModel
}
