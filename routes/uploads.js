import { Router } from "express";
import { check } from "express-validator";
import { manageImageCloudinary, testController } from "../controllers/uploads.js";
import { validModels } from "../helpers/db-validations.js";
import validateFields from "../middlewares/validate-fields.js";
import { validateFile } from "../middlewares/validate-file.js";

const router = Router();

router.put('/:model/:id', [
    validateFile,
    check('model').custom(m => validModels(m, ['teams', 'users'])),
    validateFields
], manageImageCloudinary);

router.post('/test', [
    check('uid', 'Campo obligatorio').not().isEmpty(),
    check('eid', 'Campo obligatorio').not().isEmpty(),
    check('cid', 'Campo obligatorio').not().isEmpty(),
    validateFields
], testController)

export default router;