import { Router } from "express";
import { getIndex } from '../controllers/dashboard.js';
// import { authVerify } from "../controllers/dashboard.js";
// import mdlwValidateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get('/', getIndex)

export default router;