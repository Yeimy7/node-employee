import * as Sequelize from "sequelize";
import conexion from "../config/db.js";
import Role from "./Role.js";
import bcrypt from "bcryptjs";

const User = conexion.define(
  "user",
  {
    id_user: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: "A",
      allowNull: false,
    },
    id_role: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    reset_token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  }
);

User.sync();

User.belongsTo(Role, { foreignKey: "id_role" });

export default User;
