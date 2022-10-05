import { Router } from "express";
import { check } from "express-validator";
import { login, renewToken } from "../controllers/auth.js";
import validateFields from "../middlewares/validate-fields.js";
import mdlwValidateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get('/', mdlwValidateJWT, renewToken);

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

export default router;