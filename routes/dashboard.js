import { Router } from "express";
import { authVerify } from "../controllers/dashboard.js";
import mdlwValidateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
})

export default router;