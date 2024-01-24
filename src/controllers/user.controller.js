import Role from "../models/Role.js";
import User from "../models/User.js";
import { validateUser } from "../schemas/user.js";

export const createUser = async (req, res) => {
  try {
    const result = validateUser(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }

    const role = await Role.findOne({ where: { role: "supervisor" } });
    const newUser = { ...result.data, id_role: role.id_role };
    console.log(newUser);
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
      attributes: { exclude: ["password", "id_role"] },
      include: Role,
      where: { state: "A" },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};
export const ascendUser = async (req, res) => {
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
  try {
    const user = await User.findOne({ where: { id_user: req.params.id } });
    if (!user)
      return res
        .status(404)
        .json({ msg: "Usuario no encontrado", type: "error" });

    // Buscar el rol Administrador
    const role = await Role.findOne({ where: { role: "supervisor" } });
    user.id_role = role.id_role;
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
    await user.update({ state: "I" });
    res
      .status(200)
      .json({ msg: "Usuario eliminado correctamente", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al recuperar datos de los usuarios" });
  }
};
