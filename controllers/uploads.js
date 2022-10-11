import { v2 as cloudinary } from 'cloudinary';
import Team from '../models/team.js';
import * as dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const manageImageCloudinary = async(req, res) => {
    const { id, model:paramModel, } = req.params;
    const { tempFilePath } = req.files.archive;

    let model;

    switch (paramModel) {
        case 'teams':
            model = await Team.findByPk(id);

            if (!model) {
                return res.status(400).json({
                    msg: `Modelo no encontrado (${id}).`
                });
            }
        break;
    
        default:
            return res.status(500).json({
                msg: 'watafak'
            });
    }

    // TODO: delete old file;
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json(model);
}