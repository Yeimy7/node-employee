import { validationResult } from "express-validator";
import Role from "../models/Role.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  // Revisar si hay errores
  const error = validationResult(req);
  if (!error.isEmpty()) {
    let err = error.errors.map((message) => message.msg);
    return res.status(400).json({ msg: err.join(), type: "error" });
  }
  const { username, email, password } = req.body;
  try {
    //Guardar el usuario
    const role = await Role.findOne({ where: { role: "supervisor" } });
    const newUser = { username, email, password, id_role: role.id_role };
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};
export const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ["password", "id_rol"] },
      include: Role,
      where: { estado: "A" },
    });
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};
export const ascendUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const user = await User.findOne({ where: { id_user: req.params.id } });
    if (!user)
      return res
        .status(404)
        .json({ msg: "Usuario no encontrado", type: "error" });

    // Buscar el rol Administrador
    const role = await Role.findOne({ where: { role: "administrador" } });
    user.id_role = role.id_role;
    await user.save();
    res
      .status(201)
      .json({ msg: "Rol modificado a Administrador", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al recuperar datos de los usuarios" });
  }
};
export const descendUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const user = await User.findOne({ where: { id_user: req.params.id } });
    if (!user)
      return res
        .status(404)
        .json({ msg: "Usuario no encontrado", type: "error" });

    // Buscar el rol Administrador
    const role = await Role.findOne({ where: { role: "supervisor" } });
    user.id_rol = role.id_rol;
    await user.save();
    res
      .status(201)
      .json({ msg: "Rol modificado a supervisor", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al recuperar datos de los usuarios" });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.userId);

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Usuario no encontrado", type: "error" });
    }
    user.state = "I";
    await user.save();
    res.json({ msg: "Usuario eliminado correctamente", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al recuperar datos de los usuarios" });
  }
};
