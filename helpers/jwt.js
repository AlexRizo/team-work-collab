import jwt from "jsonwebtoken";

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

        const { _id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await user.findByPK(_id);

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