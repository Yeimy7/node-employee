import { Router } from "express";
import * as authJwt from "../middlewares/authJwt.js";
import * as departmentController from "../controllers/departments.controller.js";
import * as veryfyDepartmentName from "../middlewares/verifyDepartmentName.js";
const router = Router();

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, veryfyDepartmentName.checkDuplicateName],
  departmentController.createDepartment
);
router.get("/", authJwt.verifyToken, departmentController.getDepartments);
router.get(
  "/:departmentId",
  authJwt.verifyToken,
  departmentController.getDepartmentById
);
router.patch(
  "/:departmentId",
  [authJwt.verifyToken, authJwt.isAdmin, veryfyDepartmentName.checkDuplicateName],
  departmentController.updateDepartmentById
);
router.delete(
  "/:departmentId",
  [authJwt.verifyToken, authJwt.isAdmin],
  departmentController.deleteDepartmentById
);

export default router;
