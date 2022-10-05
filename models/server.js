import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import cors from "cors";
import path from 'path';
import http from 'http'
import { Server as socketServer } from 'socket.io';
import {fileURLToPath, URL} from 'url';

import db from '../db/connection.js';
import userRoutes from '../routes/users.js'
import authRoutes from '../routes/auth.js'
import dashboardRoutes from '../routes/dashboard.js'
import socketController from '../sockets/controller.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = new socketServer(this.server);
        this.paths = {
            users: '/manage/user',
            auth: '/auth',
            dashboard: '/dashboard'
        };

        this.dbConnection();
        this.middlewares();
        this.routes();
        this.layouts();
        this.sockets();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('DB online');
        } catch (error) {
            
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.auth, authRoutes);

        this.app.use(this.paths.dashboard, dashboardRoutes);
    
        // this.app.get('/dashboard', (req, res) => {
        //     res.sendFile(path.join(__dirname, '../public/dashboard', 'index.html'));
        // });
        
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public', '404.html'));
        });
    }

    layouts() {
        this.app.set('view engine', 'ejs');
        this.app.use(expressLayouts);
    }
    
    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server on port: ', this.port);
        });
    }
}

export default Server;