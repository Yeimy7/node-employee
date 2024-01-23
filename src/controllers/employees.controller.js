import Employee from "../models/Employee.js";
import { validationResult } from "express-validator";

export const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let err = errors.errors.map((err) => err.msg);
    return res.status(400).json({ msg: err.join(), type: "error" });
  }
  try {
    const createdEmployee = await Employee.create(req.body);
    res.status(201).json(createdEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ where: { state: "A" } });
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
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
  const { names, last_names, ci } = req.body;
  try {
    let employee = await Employee.findByPk(req.params.employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ msg: "Empleado no encontrado", type: "error" });
    }
    const updates = {
      names,
      last_names,
      ci,
    };

    const updatedEmployee = await employee.update(updates);

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
    const deletedEmployee = await employee.update({ state: "I" });
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};
