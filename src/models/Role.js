import * as Sequelize from 'sequelize'
import conexion from '../config/db.js'

const Role = conexion.define('role', {
  id_role: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false
})
Role.sync()

export default Role