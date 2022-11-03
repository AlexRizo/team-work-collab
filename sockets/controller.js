import { validateJWT } from "../helpers/jwt.js"
import { Socket } from 'socket.io';
import User from "../models/user.js";
import Team from "../models/team.js";

const getUsers = async() => {
    return await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'teamId', 'img', 'status'], 
        order: [['teamId', 'DESC']],
        include: { model: Team },
    });
}


const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['auth-token']);
    
    if (!user) {
        return socket.disconnect();
    }

    socket.emit('get-users', {users: await getUsers()});

    socket.on('create-user', async() => {
        io.emit('get-users', {users: await getUsers()});
    });
}

export default socketController;