import { Router } from "express";
import { check } from "express-validator";
import { newEvent, createEvent } from "../controllers/events.js";
import validateFields from "../middlewares/validate-fields.js";

const router = Router();

router.get('/', newEvent);

router.post('/create', [
    check('title', 'El título es obligatorio.').not().isEmpty(),
    check('date', 'La fecha es obligatoria.').not().isEmpty(),
    check('type', 'El tipo de evento es obligatorio.').not().isEmpty(),
    check('description', 'Las instrucciones son obligatorias.').not().isEmpty(),

    check('date', 'La fecha no es válida.').isDate(),

    // Se debe utilizar una -regEx- para validar si el dato recibido de un -input:time- es una -hora- válida;
    check('time', 'La hora no es válida').matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'), 
    check('type', 'Propiedad inválida').isNumeric(),
    validateFields
], createEvent)

export default router;