import jwt from "jsonwebtoken";
import Team from "../models/team.js";
import User from "../models/user.js";

export const generateJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: 60 * 60 * 24
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

export const validateJWT = async(token = '') => {
    try {
        if (token.length < 10) {
            return null;
        }

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findByPk(id, { include: { model: Team } });
        
        if (user) {
            if (user.status) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        return new Error(error);
    }
}