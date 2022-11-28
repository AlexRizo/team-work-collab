import { Router } from "express";
import { getComments, sendComment } from "../controllers/comments.js";
import mdlwValidateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get('/get-comments', getComments);

router.post('/get-comments', [
    mdlwValidateJWT
], sendComment);

export default router;