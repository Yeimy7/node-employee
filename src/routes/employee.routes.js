import { Router } from "express";
import * as authJwt from "../middlewares/authJwt.js";
import * as employeeController from "../controllers/employees.controller.js";
import * as veryfyEmployeeCi from "../middlewares/verifyEmployeeCi.js";
const router = Router();

router.post(
  "/",
  [authJwt.verifyToken, veryfyEmployeeCi.checkDuplicateCi],
  employeeController.createEmployee
);
router.get("/", authJwt.verifyToken, employeeController.getEmployees);
router.get(
  "/:employeeId",
  authJwt.verifyToken,
  employeeController.getEmployeeById
);
router.patch(
  "/:employeeId",
  [authJwt.verifyToken, veryfyEmployeeCi.checkDuplicateCi],
  employeeController.updateEmployeeById
);
router.delete(
  "/:employeeId",
  [authJwt.verifyToken, authJwt.isAdmin],
  employeeController.deleteEmployeeById
);

export default router;
