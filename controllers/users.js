import { encrypt } from "../helpers/handle-bcryptjs.js";
import User from "../models/user.js";

export const createUser = async(req, res) => {
    const {name, email, password, role } = req.body;

    try {
        const hash = encrypt(password);

        const user = await User.create({
            name,
            email,
            password: hash,
            role,
            status: true
        });

        res.json(user);
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            msg: 'Error with the server.'
        })
    }
}

export const updateUser = async(req, res) => {
    const { name, password, email, status, ...rest} = req.body;
    const { id } = req.params;

    const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const dbUser = await User.findByPk(id);

    if (!dbUser || !dbUser.status) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        })
    }

    if (name) {
        rest.name = name
    }

    if (email) {
        if (emailRegEx.test(email)) {
            const emailExist = await User.findOne({
                where: { email }
            });

            if (emailExist) {
                return res.status(400).json({
                    msg: `El correo ${ email } ya existe.`
                });
            }

            rest.email = email;
        } else {
            return res.status(400).json({
                msg: `El correo ${ email } no es válido.`
            });
        }
    }

    if (password) {
        rest.password = encrypt(password);;
    }

    if (status) {
        res.status = status;
    }

    await User.update(rest, {
        where: { id }
    });

    res.json(rest);
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({
            msg: `No existe ningún usuario con el id ${ id }`
        });
    }

    await User.update(
        {
            email: `delete@user${ user.id }.com`,
            status: 0
        },
        {
            where: { id }
        }
    );

    res.json({
        msg: 'Usuario Eliminado.',
        user
    });
};
