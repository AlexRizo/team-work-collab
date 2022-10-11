import { Router } from "express";
import { getUsers } from "../controllers/admin.js";

const router = Router();

router.get('/', getUsers);

export default router;