import { Router } from "express";
import { check } from "express-validator";
import { createTeam } from '../controllers/teams.js';
import { teamExist } from "../helpers/db-validations.js";
import validateFields from "../middlewares/validate-fields.js";
import mdlwValidateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.post('/', [
    mdlwValidateJWT,
    check('team_name', 'El nombre es obligatrio.').not().isEmpty().custom(teamExist),
    validateFields
], createTeam);

export default router;