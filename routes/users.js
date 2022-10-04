import { Router } from "express";
import { check } from 'express-validator';
import { emailExist, validRol } from '../helpers/db-validations.js';
import { createUser, updateUser, deleteUser  } from '../controllers/users.js';
import validateFields from '../middlewares/validate-fields.js';
import mdlwValidateJWT from '../middlewares/validate-jwt.js';

const router = Router();

router.post('/', [
    mdlwValidateJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El correo no es válido.').not().isEmpty(),
    check('email', 'El correo no es válido.').isEmail(),
    check('email').custom(emailExist),
    check('password', 'La contraseña debe ser mayor a 6 caracteres.').isLength({min: 6}),
    check('role').custom(validRol),
    validateFields
], createUser);

router.put('/:id', [
    mdlwValidateJWT,
    check('password', 'La contraseña debe ser mayor a 5 caracteres.').isLength({min: 6}),
    check('role').custom(validRol),
    validateFields
], updateUser);

router.delete('/:id', [
    mdlwValidateJWT
], deleteUser);

export default router;