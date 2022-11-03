import { Router } from "express";
import { newEvent, createEvent } from "../controllers/events.js";

const router = Router();

router.get('/', newEvent);

router.post('/create', createEvent)

export default router;