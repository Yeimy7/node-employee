import * as config from "../config/config.js";
import { QueryTypes } from "sequelize";
import conectarDB from "../config/db.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

export const createRolesAndAdminUser = async () => {
  await Role.estimated;
  try {
    // Verificar si la tabla 'rol' ya existe en la base de datos
    const [count] = await conectarDB.query(
      `SELECT count(*) FROM information_schema.TABLES WHERE (TABLE_SCHEMA = '${config.DB_DATABASE}') AND (TABLE_NAME = 'rol')`,
      { type: QueryTypes.SELECT }
    );
     // Crear roles
    const roles = await Promise.all([
      new Role({ role: "administrador" }).save(),
      new Role({ role: "supervisor" }).save(),
    ]);

    // Crear usuario con el rol de 'Administrador'
    await User.create({
      id_user: "0e96d693-d845-4cca-9787-74d5a1917824",
      username: "admin",
      email: "admin@gmail.com",
      password: "123456",
      state: "A",
      id_role: roles[0].id_role, // Asignar el rol de 'Administrador'
    });
    console.log("Tabla Rol creada y usuario administrador creado");
  } catch (error) {
    0;
    console.log(error);
  }
};

export const verifyTables = async () => {
  let initializationPerformed = false;
  // Llamada a la función para crear roles y usuario administrador
  if (!initializationPerformed) {
    try {
      // Verificar si existen los roles específicos
      const rolesExist = await Role.count();

      if (rolesExist === 0) {
        // No existen los roles, realizar la inicialización
        await createRolesAndAdminUser();
        initializationPerformed = true; // Marcar que la inicialización ya ha ocurrido
      }
    } catch (error) {
      console.error(error);
    }
  }
};
