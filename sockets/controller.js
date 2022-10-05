import { validateJWT } from "../helpers/jwt.js"
import { Socket } from 'socket.io';

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['auth-token']);
    if (!user) {
        return socket.disconnect();
    }
}

export default socketController;