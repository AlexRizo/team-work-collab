import jwt from "jsonwebtoken";
import Team from "../models/team.js";
import User from "../models/user.js";

const mdlwValidateJWT = async(req, res, next) => {
    const token = req.header('tkn');

    if (!token) {
        return res.status(400).json({
            error: 'El token es obligatorio.',
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findByPk(id);

        if (!user || !user.status) {
            return res.status(404).json({
                error: 'Token inválido'
            });
        }

        const team = await Team.findByPk(user.teamId);

        if (!team) {
            return res.status(404).json({
                error: 'Usuario sin equipo'
            });
        }
        
        req.team = team;
        req.user = user;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token inválido'
        })
    }
}

export default mdlwValidateJWT;