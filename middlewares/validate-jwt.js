import jwt from "jsonwebtoken";
import Team from "../models/team.js";
import User from "../models/user.js";

const mdlwValidateJWT = async(req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(400).json({
            msg: 'El token es obligatorio.'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findByPk(id);

        if (!user || !user.status) {
            return res.status(404).json({
                msg: 'Token inválido'
            });
        }

        const team = await Team.findByPk(user.teamId);

        if (!team) {
            return res.status(404).json({
                msg: 'Usuario sin equipo'
            });
        }

        console.log(team);
        
        req.team = team;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        })
    }
}

export default mdlwValidateJWT;