import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    return res.render('profile');
})

export default router;