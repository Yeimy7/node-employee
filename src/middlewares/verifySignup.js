import User from "../models/User.js";

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return next();
    }
    const userName = await User.findOne({
      where: { username },
    });
    if (userName)
      return res.status(400).json({
        msg: `Ya existe un usuario: ${username} registrado`,
        type: "error",
      });

    const userEmail = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    if (userEmail)
      return res.status(400).json({ msg: "El email ya existe", type: "error" });
    next();
  } catch (error) {
    console.error("Error en el middleware verifySignup", error);
    res.status(500).json({
      msg: "Error interno del servidor",
      type: "error",
    });
  }
};
