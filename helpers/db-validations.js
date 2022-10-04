import Role from '../models/role.js';
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