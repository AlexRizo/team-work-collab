import { Router } from "express";
import { check } from "express-validator";
import { manageImageCloudinary } from "../controllers/uploads.js";
import { validModels } from "../helpers/db-validations.js";
import validateFields from "../middlewares/validate-fields.js";
import { validateFile } from "../middlewares/validate-file.js";

const router = Router();

router.put('/:model/:id', [
    validateFile,
    check('model').custom(m => validModels(m, ['teams'])),
    validateFields
], manageImageCloudinary);

export default router;