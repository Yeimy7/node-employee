import { Router } from "express";
import { check } from 'express-validator'
import * as userController from '../controllers/user.controller.js'
import * as authJwt from '../middlewares/authJwt.js'
import * as veryfySignup from '../middlewares/verifySignup.js'
const router = Router();

router.post('/',
  [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 }),
    veryfySignup.checkDuplicateUserNameOrEmail,
    authJwt.verifyToken, 
    authJwt.isAdmin
  ],
  userController.createUser)
  router.get('/',
  [authJwt.verifyToken, authJwt.isAdmin],
   userController.getUsers)
  router.put('/up/:id', [ authJwt.verifyToken, authJwt.isAdmin], userController.ascendUser)
  router.put('/down/:id', [ authJwt.verifyToken, authJwt.isAdmin], userController.descendUser)
  router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUserById)

export default router;