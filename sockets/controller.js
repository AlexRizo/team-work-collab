import { validateJWT } from "../helpers/jwt.js"
import { Socket } from 'socket.io';
import User from "../models/user.js";
import Team from "../models/team.js";
import Comment from "../models/comment.js";

const getUsers = async() => {
    return await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'teamId', 'img', 'status'], 
        order: [['teamId', 'DESC']],
        include: { model: Team },
    });
}

const getMessages = async(eid) => {
    return await Comment.findAll({where: {eventId: eid}});
}

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['tkn']);
    
    if (!user) {
        return socket.disconnect();
    }

    socket.emit('get-users', {users: await getUsers()});

    socket.on('create-user', async() => {
        io.emit('get-users', {users: await getUsers()});
    });


    socket.on('eid', async(eid) => {
        socket.emit('get-messages', await getMessages(eid));
        socket.join(`room-${eid}`);
        console.log(`conectado a room-${eid}`);
    })
    
    socket.on('send-message', async({comm, eid}) => {
        const { id } = await validateJWT(comm.tkn);
        comm.userId = id;
        await Comment.create(comm);
        io.to(`room-${eid}`).emit('get-messages', await getMessages(comm.eventId))
    });
}

export default socketController;