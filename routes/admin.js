import { Router } from "express";
import { getUsers } from "../controllers/admin.js";
import mdlwValidateJWT from "../middlewares/validate-jwt.js";
import { isAdmin } from "../middlewares/validate-roles.js";

const router = Router();

router.get('/', [
    isAdmin
], getUsers);

export default router;