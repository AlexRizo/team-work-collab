import Role from "../models/role.js";
import Team from "../models/team.js";
import User from "../models/user.js"

export const getUsers = async(req, res) => {
    const users = await User.findAll({
        include: [{model:Team}],
        attributes: ['id', 'name', 'email', 'teamId', 'status'], 
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['teamId', 'DESC']],
        where: {status: 1}
    });

    const teams = await Team.findAll();
    const roles = await Role.findAll();
    
    res.render('admin', {users, teams, roles})
}