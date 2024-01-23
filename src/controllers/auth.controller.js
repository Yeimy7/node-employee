import bcryptjs from "bcryptjs";
import fs from "fs-extra";
import handlebars from "handlebars";
import jwt from "jsonwebtoken";
import path from "path";
import * as config from "../config/config.js";
import { fileURLToPath } from "url";
import { transporter } from "../config/mailer.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

const { WORD_SECRET, WORD_SECRET_RESET, URL_FRONT } = config;

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email }, include: Role });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El usuario no existe", type: "error" });
    }
    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res
        .status(400)
        .json({ msg: "Password incorrecto", type: "error" });
    }

    // Token
    jwt.sign(
      { id: user.id_user },
      WORD_SECRET,
      {
        expiresIn: 7200, //2 horas
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res
      .status(400)
      .json({
        msg: "Hubo un error durante el login, intentelo nuevamente",
        type: "error",
      });
  }
};

export const updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  try {
    let user = await User.findOne({ where: { id_user: req.userId } });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El usuario no existe", type: "error" });
    }

    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res
        .status(500)
        .json({ msg: "La contraseña actual es incorrecta", type: "error" });
    }

    const salt = await bcryptjs.genSalt(10);
    const newPass = await bcryptjs.hash(newPassword, salt);
    user.password = newPass;
    await user.save();
    res
      .status(200)
      .json({ msg: "Contraseña actualizada exitosamente", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevamente", type: "error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ msg: "El email es requerido", type: "error" });
  }
  const message =
    "Recibirás un email con instrucciones para reiniciar tu contraseña en unos minutos. <p><b>Por favor, revise su email</b></p>";
  let linkVerificacion;
  let emailStatus = "OK";
  let user;
  try {
    user = await User.findOne({ where: { email } });
    const token = jwt.sign({ id: user.id_user }, WORD_SECRET_RESET, {
      expiresIn: 600,
    });
    linkVerificacion = `${URL_FRONT}/auth/new-password/${token}`;
    user.reset_token = token;
  } catch (error) {
    return res.json({
      msg: "No se encontró el email del usuario",
      type: "error",
    });
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "../templates/email.hbs");
  const source = fs.readFileSync(filePath, "utf-8");
  const template = handlebars.compile(source)({ link: linkVerificacion });

  try {
    await transporter.sendMail({
      from: '"Olvide la contraseña  👻" <yeimylimachi@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Olvide la contraseña", // Subject line
      html: template,
    });
  } catch (error) {
    emailStatus = error;
    console.log(error);
    return res
      .status(400)
      .json({ msg: "algo salio mal, intente nuevamente", type: "error" });
  }
  try {
    await usuario.save();
  } catch (error) {
    emailStatus = error;
    return res
      .status(400)
      .json({ msg: "Algo salio mal, intente nuevamente", type: "error" });
  }
  res.json({ msg: message, info: emailStatus, type: "success" });
};

export const createNewPassword = async (req, res) => {
  const { newPassword } = req.body;
  const resetToken = req.headers.reset;
  if (!(resetToken && newPassword)) {
    res
      .status(400)
      .json({ msg: "todos los campos son requeridos", type: "error" });
  }
  let jwtPayload;
  let user;
  try {
    jwtPayload = jwt.verify(resetToken, WORD_SECRET_RESET);
    user = await User.findOne({ where: { reset_token: resetToken } });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Algo salio mal, intente nuevamente", type: "error" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const newPass = await bcryptjs.hash(newPassword, salt);
    user.password = newPass;
    await user.save();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Algo salio mal, intente nuevamente", type: "error" });
  }

  res.json({ msg: "La contraseña fue cambiada.", type: "success" });
};
