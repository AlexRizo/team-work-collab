import { Router } from "express";
import { getUserTeam } from "../controllers/team.js";

const router = Router();

// router.get('/', (req, res) => {
//     const { id } = req.params || null;

//     console.log(id);
//     res.json({id})
// })

router.get('/', getUserTeam)

export default router;