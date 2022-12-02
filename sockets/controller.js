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
    return await Comment.findAll({where: {eventId: eid}, include: { model: User }});
}

const uploadFiles = async(file, cid) => {
    const formData = new FormData();
    formData.append('cid', cid);
    formData.append('files', file);

    console.log(file);
    
    await fetch('http://localhost:8080/manage/uploads/test', {
        method: 'PUT',
        body: formData
    })
    .then((res => {
        console.log(res);
    }))
}

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['tkn']);
    
    if (!user) {
        return socket.disconnect();
    }

    setTimeout(async() => {
        socket.emit('get-users', {users: await getUsers()});
    }, 90)

    socket.on('create-user', async() => {
        io.emit('get-users', {users: await getUsers()});
    });


    socket.on('conn', async({ eid, tkn}) => {
        socket.emit('get-messages', await getMessages(eid));
        socket.join(`room-${eid}`);
        socket.emit('user', await validateJWT(tkn));
        console.log(`conectado a { room-${eid} }`);
        
    })
    
    socket.on('send-message', async({comm, file, eid}) => {
        const { id } = await validateJWT(comm.tkn);
        comm.userId = id;
        const $comm = await Comment.create(comm);
        io.to(`room-${eid}`).emit('get-messages', await getMessages(comm.eventId));
        if(file) {
            socket.emit('file-included', $comm);
        }
    });
}

export default socketController;