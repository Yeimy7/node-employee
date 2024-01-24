import * as Sequelize from "sequelize";
import conexion from "../config/db.js";
import Department from "./Department.js";

const Employee = conexion.define(
  "employee",
  {
    id_employee: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    names: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_names: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ci: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    genre: {
      type: Sequelize.ENUM,
      values: ["masculino", "femenino"],
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salary: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: "A",
      allowNull: false,
    },
    id_department: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Employee.sync();

Employee.belongsTo(Department, { foreignKey: "id_department" });
export default Employee;
