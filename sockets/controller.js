import { validateJWT } from "../helpers/jwt.js"
import { Socket } from 'socket.io';
import User from "../models/user.js";
import Team from "../models/team.js";
import Comment from "../models/comment.js";
import CommentImage from "../models/comment-image.js";

const getUsers = async() => {
    return await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'teamId', 'img', 'status'], 
        order: [['teamId', 'DESC']],
        include: { model: Team },
    });
}

const getMessages = async(eid) => {
    const messages = await Comment.findAll({where: {eventId: eid}, include: { model: User }});
    const images = await CommentImage.findAll( { where: { eventId: eid } });

    return {messages, images}
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
        let $comm;

        comm.userId = id;
        
        if(file) {
            comm.fileIncluded = true;
            $comm = await Comment.create(comm);
            socket.emit('file-included', $comm.id);
        } else {
            await Comment.create(comm);
        }
        
        setTimeout(async() => {
            io.to(`room-${eid}`).emit('get-messages', await getMessages(comm.eventId));
        }, 760)
    });
}

export default socketController;