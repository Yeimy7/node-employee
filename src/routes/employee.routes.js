import { Router } from "express";
import { check } from "express-validator";
import * as authJwt from "../middlewares/authJwt.js";
import * as employeeController from "../controllers/employees.controller.js";
const router = Router();

router.post(
  "/",
  [
    check("names", "El nombre es obligatorio").not().isEmpty(),
    check("last_names", "El apellido es obligatorio").not().isEmpty(),
    check("ci", "El ci es obligatorio").not().isEmpty(),
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  employeeController.createEmployee
);
router.get("/", authJwt.verifyToken, employeeController.getEmployees);
router.get(
  "/:employeeId",
  authJwt.verifyToken,
  employeeController.getEmployeeById
);
router.put(
  "/:employeeId",
  [authJwt.verifyToken, authJwt.isAdmin],
  employeeController.updateEmployeeById
);
router.delete(
  "/:employeeId",
  [authJwt.verifyToken, authJwt.isAdmin],
  employeeController.deleteEmployeeById
);

export default router;
