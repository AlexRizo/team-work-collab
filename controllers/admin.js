import Team from "../models/team.js";
import User from "../models/user.js"

export const getUsers = async(req, res) => {
    const users = await User.findAll({
        include: [{model:Team}],
        attributes: ['id', 'name', 'email', 'teamId'], 
        where: {status: 1}
    });
    
    res.render('admin', {users})
}