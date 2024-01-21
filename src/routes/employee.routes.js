import { Router } from "express";
const router = Router();

import * as employeeController from "../controllers/employees.controller.js";

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:employeeId", employeeController.getEmployeeById);
router.put("/:employeeId", employeeController.updateEmployeeById);
router.delete("/:employeeId", employeeController.deleteEmployeeById);

export default router;
