import User from "../models/User.js";

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const userName = await User.findOne({
    where: { username: req.body.username },
  });
  if (userName)
    return res.status(400).json({
      msg: `Ya existe un usuario: ${req.body.username} registrado`,
      type: "error",
    });

  const userEmail = await User.findOne({
    where: { email: req.body.email },
    attributes: { exclude: ["password"] },
  });
  if (userEmail)
    return res.status(400).json({ msg: "El email ya existe", type: "error" });
  next();
};
