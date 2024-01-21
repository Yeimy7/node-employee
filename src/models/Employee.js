import * as Sequelize from "sequelize";
import conexion from "../config/db.js";

const Employee = conexion.define(
  "employee",
  {
    id_employee: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    nombres: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ci: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Employee.sync();

export default Employee;
