import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authJwt from "../middlewares/authJwt.js";
import * as veryfySignup from "../middlewares/verifySignup.js";
const router = Router();

router.post(
  "/",
  [
    veryfySignup.checkDuplicateUserNameOrEmail,
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  userController.createUser
);
router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.getUsers
);
router.patch(
  "/up/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.ascendUser
);
router.patch(
  "/down/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.descendUser
);
router.delete(
  "/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.deleteUserById
);

export default router;
