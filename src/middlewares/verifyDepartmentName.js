import Department from "../models/Department.js";

export const checkDuplicateName = async (req, res, next) => {
  try {
    const { department_name } = req.body;
    if (!department_name) return next();
    const name = await Department.findOne({
      where: { department_name },
    });
    if (name)
      return res.status(400).json({
        msg: `Ya existe un departamento registrado con el nombre: ${department_name}`,
        type: "error",
      });
    next();
  } catch (error) {
    console.error("Error en el middleware checkDuplicateName:", error);
    res.status(500).json({
      msg: "Error interno del servidor",
      type: "error",
    });
  }
};
