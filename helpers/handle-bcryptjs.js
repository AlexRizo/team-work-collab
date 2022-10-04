import bcryptjs from 'bcryptjs';

export const encrypt = (string) => {
    const salt = bcryptjs.genSaltSync();
    const hash = bcryptjs.hashSync(string, salt);

    return hash;
}