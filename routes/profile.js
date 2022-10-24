import { Router } from "express";
import mdlwValidateJWT from "../middlewares/validate-jwt.js";
import { getCurrentUser } from "../controllers/profile.js"

const router = Router();

router.get('/', (req, res) => res.render('profile'));

router.get('/user', [
    mdlwValidateJWT
], getCurrentUser);

export default router;