import { validateJWT } from '../helpers/jwt.js';
import User from '../models/user.js'

export const getUserTeam = async(req, res) => {
    const { tid, tkn } = req.query;

    const user = await validateJWT(tkn);

    console.log(user.name, '|', user.Team.team_name);

    // const tUsers = await User.findAll({where: {teamId: tid}});

    // console.log(tUsers);

    res.render('team', {});
}