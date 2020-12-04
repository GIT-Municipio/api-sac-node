const Sequelize = require('sequelize')
    // const sequelize = require('../../../db/easySeguridadConn')

class UsuariosModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            cedula: { type: DataTypes.STRING(65), primaryKey: true, autoIncrement: false, allowNull: false, field: 'usm_cedula' },
            nombres: { type: DataTypes.STRING(40), allowNull: true, field: 'usm_nombres' },
            apellidos: { type: DataTypes.STRING(40), allowNull: true, field: 'usm_apellidos' },
            password: { type: DataTypes.STRING(13), allowNull: true, field: 'usm_password' },
            email: { type: DataTypes.STRING(15), allowNull: false, field: 'usm_email' },
            estado: { type: DataTypes.STRING(50), allowNull: false, field: 'usm_estado' }
        }, {
            modelName: 'UsuariosModel',
            tableName: 'tbl_usuarios_municipalidad',
            timestamps: false,
            schema: 'corp'
                // sequelize
        })
    }
}

// UsuariosModel.init(sequelize, Sequelize)

module.exports = UsuariosModel