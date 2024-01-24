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
import {
  validateAuth,
  validateNewPassAuth,
  validatePartialAuth,
} from "../schemas/auth.js";

const { WORD_SECRET, WORD_SECRET_RESET, URL_FRONT } = config;

export const signin = async (req, res) => {
  try {
    const result = validateAuth(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }
    let user = await User.findOne({
      where: { email: result.data.email },
      include: Role,
    });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El usuario no existe", type: "error" });
    }
    const correctPass = await bcryptjs.compare(
      result.data.password,
      user.password
    );
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
    res.status(400).json({
      msg: "Hubo un error durante el login, intentelo nuevamente",
      type: "error",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const result = validateNewPassAuth(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }
    let user = await User.findOne({ where: { id_user: req.userId } });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El usuario no existe", type: "error" });
    }

    const correctPass = await bcryptjs.compare(
      result.data.password,
      user.password
    );
    if (!correctPass) {
      return res
        .status(500)
        .json({ msg: "La contraseña actual es incorrecta", type: "error" });
    }

    const salt = await bcryptjs.genSalt(10);
    const newPass = await bcryptjs.hash(result.data.newPassword, salt);
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
  const result = validatePartialAuth(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ msg: JSON.parse(result.error.message), type: "error" });
  }
  const message =
    "Recibirás un email con instrucciones para reiniciar tu contraseña en unos minutos. <p><b>Por favor, revise su email</b></p>";
  const emailFrom = '"Olvide la contraseña" <yeimylimachi@gmail.com>';
  const emailSubject = "Olvide la contraseña";

  try {
    const user = await User.findOne({ where: { email: result.data.email } });
    const token = jwt.sign({ id: user.id_user }, WORD_SECRET_RESET, {
      expiresIn: 600,
    });
    const linkVerificacion = `${URL_FRONT}/auth/new-password/${token}`;
    user.reset_token = token;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "../templates/email.hbs");
    const source = fs.readFileSync(filePath, "utf-8");
    const template = handlebars.compile(source)({ link: linkVerificacion });

    await Promise.all([
      transporter.sendMail({
        from: emailFrom,
        to: user.email,
        subject: emailSubject,
        html: template,
      }),
      user.save(),
    ]);

    res.json({ msg: message, info: "OK", type: "success" });
  } catch (error) {
    console.error("Error en forgotPassword:", error);

    res.status(400).json({
      msg: "Algo salió mal, inténtelo nuevamente",
      info: error.toString(),
      type: "error",
    });
  }
};

export const createNewPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const resetToken = req.headers.reset;
    if (!newPassword) {
      return res
        .status(400)
        .json({ msg: "El nuevo password es requerido", type: "error" });
    }
    if (!resetToken) {
      return res
        .status(400)
        .json({ msg: "Reset Token no encontrado", type: "error" });
    }

    // Verificar el token y encontrar al usuario
    const jwtPayload = jwt.verify(resetToken, WORD_SECRET_RESET);
    const user = await User.findOne({ where: { reset_token: resetToken } });

    // Cambiar la contraseña del usuario
    const salt = await bcryptjs.genSalt(10);
    const newPass = await bcryptjs.hash(newPassword, salt);
    user.password = newPass;
    await user.save();

    // Respuesta exitosa
    res.json({ msg: "La contraseña fue cambiada.", type: "success" });
  } catch (error) {
    console.error("Error en createNewPassword:", error);

    // Manejar errores específicos
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "El token ha expirado", type: "error" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Token no válido", type: "error" });
    }
    // Si no es un error esperado, devolver un mensaje general
    res
      .status(401)
      .json({ msg: "Algo salió mal, inténtelo nuevamente", type: "error" });
  }
};
