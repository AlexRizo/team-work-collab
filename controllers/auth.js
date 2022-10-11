import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import { generateJWT} from '../helpers/jwt.js';

export const login = async(req, res) => {
    const { email, password }= req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                msg: 'Correo / Contraseña incorrectos. - correo'
            });
        }

        const validPass = bcryptjs.compareSync(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Correo / Contraseña incorrectos. - contraseña'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'Cuenta bloqueada'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error with the server.'
        });
    }
}

export const renewToken = async(req, res) => {
    const { user, team } = req;

    // Generar JWT;
    const token = await generateJWT(user.id);

    res.json({
        user,
        team,
        token
    });
}