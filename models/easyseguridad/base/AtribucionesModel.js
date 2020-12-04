const Sequelize = require('sequelize')
// const sequelize = require('../../../db/easySeguridadConn')

class AtribucionesModel extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        nombrecorto: { type: DataTypes.STRING(65), primaryKey: true, autoIncrement: false, allowNull: false, field: 'NombreCorto' },
        aplicacion: { type: DataTypes.STRING(50), primaryKey: true, autoIncrement: false, allowNull: false, field: 'Aplicacion' },
        modulo: { type: DataTypes.STRING(50), primaryKey: true, autoIncrement: false, allowNull: false, field: 'Modulo' },
        transaccion: { type: DataTypes.STRING(50), primaryKey: true, autoIncrement: false, allowNull: false, field: 'Transaccion' },
        habilitado: { type: DataTypes.BOOLEAN, allowNull: false, field: 'Habilitado' }
      },
      {
        modelName: 'AtribucionesModel',
        tableName: 'Atribuciones',
        timestamps: false,
        schema: 'dbo'
        // sequelize
      }
    )
  }
}

AtribucionesModel.init(sequelize, Sequelize)

module.exports = AtribucionesModel
