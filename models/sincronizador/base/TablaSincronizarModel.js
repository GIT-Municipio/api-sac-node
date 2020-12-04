const Sequelize = require('sequelize')
const sequelize = require('../../../db/sincronizadorConn')

class TablaSincronizarModel extends Sequelize.Model {}
TablaSincronizarModel.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'tbl_id' },
  tablaOrigen: { type: Sequelize.STRING(100), allowNull: false, field: 'tbl_tabla_origen' },
  tablaDestino: { type: Sequelize.STRING(100), allowNull: false, field: 'tbl_tabla_destino' },
  descripcion: { type: Sequelize.STRING(200), allowNull: true, field: 'tbl_descripcion' },
  rutaServicio: { type: Sequelize.STRING(200), allowNull: false, field: 'tbl_ruta_servicio' },
  usuarioCreacion: { type: Sequelize.STRING(100), allowNull: false, field: 'tbl_usuario_creacion' },
  usuarioActualizacion: { type: Sequelize.STRING(100), allowNull: true, field: 'tbl_usuario_actualizacion' },
  fechaCreacion: { type: Sequelize.DATE, allowNull: false, field: 'tbl_fecha_creacion' },
  fechaActualizacion: { type: Sequelize.DATE, allowNull: true, field: 'tbl_fecha_actualizacion' },
  estado: { type: Sequelize.STRING(15), allowNull: true, field: 'tbl_estado' }
}, {
  modelName: 'TablaSincronizarModel',
  tableName: 'tbl_TablaSincronizar',
  timestamps: true,
  createdAt: 'fechaCreacion',
  updatedAt: 'fechaActualizacion',
  schema: 'sinc',
  sequelize
})

module.exports = {
  TablaSincronizarModel
}
