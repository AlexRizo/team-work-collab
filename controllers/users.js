import { encrypt } from "../helpers/handle-bcryptjs.js";
import User from "../models/user.js";
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const createUser = async(req, res) => {
    const {name, email, password, role, teamId} = req.body;
    // const { tempFilePath } = req.files;
    const colors = [
        '#BDC3C7',
        '#3498DB',
        '#1ABC9C',
        '#22E6D6',
        '#22E67A',
        '#F1C40F',
        '#E67E22',
        '#E64522',
        '#E62256'
    ]

    const color = Math.floor(Math.random()*9);

    try {
        const hash = encrypt(password);

        const user = await User.create({
            name,
            email,
            password: hash,
            role,
            status: true,
            color: colors[color],
            teamId
        });

        res.json(user);
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            msg: 'Error with the server.'
        })
    }
}

export const updateUser = async(req, res) => {
    const { name, password, email, status, teamId, img, ...rest} = req.body;
    const { id } = req.params;

    
    if (img) {
        // await updateOrCreateImg(id, img);
        console.log({img});
    }

    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const dbUser = await User.findByPk(id);

    if (!dbUser || !dbUser.status) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        })
    }

    if (name) {
        rest.name = name
    }

    if (email) {
        if (emailRegEx.test(email)) {
            const emailExist = await User.findOne({
                where: { email }
            });

            if (emailExist) {
                return res.status(400).json({
                    msg: `El correo ${ email } ya existe.`
                });
            }

            rest.email = email;
        } else {
            return res.status(400).json({
                msg: `El correo ${ email } no es válido.`
            });
        }
    }

    if (password) {
        rest.password = encrypt(password);;
    }

    if (status) {
        res.status = status;
    }

    if (teamId) {
        rest.teamId = teamId
    }

    await User.update(rest, {
        where: { id }
    });

    res.json(rest); 
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({
            msg: `No existe ningún usuario con el id ${ id }`
        });
    }

    await User.update(
        {
            email: `delete@user${ user.id }.com`,
            status: 0
        },
        {
            where: { id }
        }
    );

    res.json({
        msg: 'Usuario Eliminado.',
        user
    });
};


const updateOrCreateImg = async(id, img) => {
    const user = User.findByPk(id)

    // TODO: update or create;
    if (user.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    try {
        const { secure_url } = await cloudinary.uploader.upload(img);
        
        model.img = secure_url;

        await model.save();

        return console.log('upload succefully');

    } catch (error) {
        return console.log(error);        
    }
}