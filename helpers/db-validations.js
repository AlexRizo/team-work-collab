import Role from '../models/role.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import EventType from '../models/event-type.js';

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
        throw new Error('Ya existe un equipo con ese nombre');
    }
}

export const validModels = (model = '', models = []) => {
    const isValid = models.includes(model);

    if (!isValid) {
        throw new Error('Modelo no permitido');
    }

    return true;
}

export const validTime = (time = '') => {
    if (!time) {
        return true;
    }

    const timeRegEx = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (timeRegEx.test(time)) {
        return true;
    } else {
        return new Error('La hora no es válida.')
    }
}

export const validateEventType = async(type = 0) => {
    const dbEvType = await EventType.findByPk(type);
    
    if (!dbEvType) {
        throw new Error(`El evento ${type} no es válido.`);
    }

    return true
}