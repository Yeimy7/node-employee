import Employee from "../models/Employee.js";

export const checkDuplicateCi = async (req, res, next) => {
  try {
    const { ci } = req.body;
    if (!ci) return next();
    const ciEmp = await Employee.findOne({
      where: { ci },
    });
    if (ciEmp)
      return res.status(400).json({
        msg: `Ya existe un empleado con ci: ${ci} registrado`,
        type: "error",
      });
    next();
  } catch (error) {
    console.error("Error en el middleware checkDuplicateCi:", error);
    res.status(500).json({
      msg: "Error interno del servidor",
      type: "error",
    });
  }
};
