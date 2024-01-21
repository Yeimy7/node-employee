import Employee from "../models/Employee.js";

export const createEmployee = async (req, res) => {
  // Revisar si hay errores
  //   const errores = validationResult(req)
  //   if (!errores.isEmpty()) {
  //     let err = errores.errors.map(mensaje => (mensaje.msg))
  //     return res.status(400).json({ msg: err.join(), type: 'error' })
  //   }
  try {
    const empleadoCreado = await Employee.create(req.body);
    res.status(201).json(empleadoCreado);
  } catch (error) {
    res
      .status(500)
    //   .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
    .json(error)
  }
};

export const getEmployees = (req, res) => {
  res.json("hola emploo");
};

export const getEmployeeById = (req, res) => {};

export const updateEmployeeById = (req, res) => {};

export const deleteEmployeeById = (req, res) => {};
