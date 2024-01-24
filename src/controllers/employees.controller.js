import Employee from "../models/Employee.js";
import {
  validateEmployee,
  validatePartialEmployee,
} from "../schemas/employee.js";

export const createEmployee = async (req, res) => {
  try {
    const result = validateEmployee(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }
    const createdEmployee = await Employee.create(result.data);
    res.status(201).json(createdEmployee);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const { depto, position, salary, genre } = req.query;

    const where = {
      state: "A",
      ...(depto && { id_department: depto }),
      ...(position && { position }),
      ...(salary && { salary }),
      ...(genre && { genre }),
    };

    const employees = await Employee.findAll({ where });

    return res.status(200).json(employees || []);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor, intente nuevamente",
      type: "error",
    });
  }
};
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: { id_employee: req.params.employeeId },
    });
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const updateEmployeeById = async (req, res) => {
  try {
    const result = validatePartialEmployee(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }
    let employee = await Employee.findByPk(req.params.employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ msg: "Empleado no encontrado", type: "error" });
    }

    const updatedEmployee = await employee.update(result.data);

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const deleteEmployeeById = async (req, res) => {
  try {
    let employee = await Employee.findByPk(req.params.employeeId);

    if (!employee) {
      return res
        .status(404)
        .json({ msg: "Empleado no encontrado", type: "error" });
    }
    await employee.update({ state: "I" });
    res
      .status(200)
      .json({ msg: "Empleado eliminado correctamente", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};
