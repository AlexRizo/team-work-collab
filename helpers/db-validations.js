import Role from '../models/role.js';
import Team from '../models/team.js';
import User from '../models/user.js';

export const validRol = async(role = '') => {
    if (role === '') {
        role = 'USER_ROLE'
    }

    const dbRole = await Role.findOne({
        where: { role }
    });

    if (!dbRole) {
        throw new Error(`El rol ${ role } no es válido.`);
    }
}

export const emailExist = async(email = '') => {
    const dbEmail = await User.findOne({
        where: { email }
    });

    if (dbEmail) {
        throw new Error('Ya existe una cuenta con esa dirección de correo');
    }
}

export const teamExist = async(team = '') => {
    const dbTeam = await Team.findOne({
        where: { team_name:team }
    });

    if (dbTeam) {
        throw new Error('Ya existe equipo con ese nombre');
    }
}

export const validModels = (model = '', models = []) => {
    const isValid = models.includes(model);

    if (!isValid) {
        throw new Error('Modelo no permitido');
    }

    return true;
}