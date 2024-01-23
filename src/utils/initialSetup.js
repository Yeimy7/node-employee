import { QueryTypes } from 'sequelize'
import conectarDB from '../config/db.js'
import Role from '../models/Role.js'

export const createRoles = async () => {
    await Role.estimated
    try {
      const [count] = await conectarDB.query(`SELECT count(*) FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'activos') AND (TABLE_NAME = 'rol')`, { type: QueryTypes.SELECT });
      if (Object.values(count)[0] > 0) return
  
      await Promise.all([
        new Role({ role: 'administrador' }).save(),
        new Role({ role: 'supervisor' }).save(),
      ])
      console.log('Tabla Rol creada')
    } catch (error) {
      console.log(error);
    }
  }