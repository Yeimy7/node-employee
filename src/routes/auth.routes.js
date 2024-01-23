import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authJwt from "../middlewares/authJwt.js";
const router = Router();

router.post("/signin", authController.signin);
router.put("/forgot-password", authController.forgotPassword);
router.put("/new-password", authController.createNewPassword);
router.put(
  "/profile/pwd",
  [authJwt.verifyToken],
  authController.updatePassword
);
export default router;
