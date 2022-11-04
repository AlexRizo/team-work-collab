import { Router } from "express";
import { check } from "express-validator";
import { newEvent, createEvent, getEvents } from "../controllers/events.js";
import { validateEventType, validTime } from "../helpers/db-validations.js";
import { validateJWT } from "../helpers/jwt.js";
import validateFields from "../middlewares/validate-fields.js";

const router = Router();

router.get('/', newEvent);

router.get('/get-events', [validateJWT], getEvents);

router.post('/create', [
    check('title', 'El título es obligatorio.').not().isEmpty(),
    check('date', 'La fecha es obligatoria.').not().isEmpty(),
    check('type', 'Error.').custom(validateEventType),
    check('description', 'Las instrucciones son obligatorias.').not().isEmpty(),

    check('date', 'La fecha no es válida.').isDate(),

    // Se debe utilizar una -regEx- para validar si el dato recibido de un -input:time- es una -hora- válida;
    check('time', 'La hora no es válida').custom(validTime),
    check('type', 'Propiedad inválida.').isNumeric(),
    validateFields
], createEvent)

export default router;