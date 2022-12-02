import { v2 as cloudinary } from 'cloudinary';
import Team from '../models/team.js';
import User from '../models/user.js';
import * as dotenv from 'dotenv'
import CommentImage from '../models/comment-image.js';

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

        case 'users':
            model = await User.findByPk(id);

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

    // TODO: update or create;
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json(model.img);
}

export const testController = async(req, res) => {
    // console.log(req.body);
    // console.log(req.files);

    const { cid } = req.body;
    const { tempFilePath } = req.files.files;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    const data = {
        commentId: cid,
        image: secure_url
    }

    const image = await CommentImage.create(data);

    res.json(image)
}