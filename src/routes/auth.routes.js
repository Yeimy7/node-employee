import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authJwt from "../middlewares/authJwt.js";
const router = Router();

router.post("/signin", authController.signin);
router.patch("/forgot-password", authController.forgotPassword);
router.patch("/new-password", authController.createNewPassword);
router.patch(
  "/change-pwd",
  [authJwt.verifyToken],
  authController.updatePassword
);
export default router;
