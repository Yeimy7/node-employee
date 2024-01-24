import Department from "../models/Department.js";
import {
  validateDepartment,
  validatePartialDepartment,
} from "../schemas/department.js";

export const createDepartment = async (req, res) => {
  try {
    const result = validateDepartment(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }
    const createdDepartment = await Department.create(result.data);
    res.status(201).json(createdDepartment);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({ where: { state: "A" } });
    res.status(200).json(departments);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findOne({
      where: { id_department: req.params.departmentId },
    });
    res.status(200).json(department);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const updateDepartmentById = async (req, res) => {
  try {
    const result = validatePartialDepartment(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ msg: JSON.parse(result.error.message), type: "error" });
    }
    let department = await Department.findByPk(req.params.departmentId);
    if (!department) {
      return res
        .status(404)
        .json({ msg: "Departamento no encontrado", type: "error" });
    }

    const updatedDepartment = await department.update(result.data);

    res.status(200).json(updatedDepartment);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};

export const deleteDepartmentById = async (req, res) => {
  try {
    let department = await Department.findByPk(req.params.departmentId);

    if (!department) {
      return res
        .status(404)
        .json({ msg: "Departamento no encontrado", type: "error" });
    }
    await department.update({ state: "I" });
    res
      .status(200)
      .json({ msg: "Departamento eliminado correctamente", type: "success" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error en el servidor, intente nuevemente", type: "error" });
  }
};
