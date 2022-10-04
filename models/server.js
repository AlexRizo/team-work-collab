import express from 'express';
import cors from "cors";
import path from 'path';

import {fileURLToPath, URL} from 'url';

import db from '../db/connection.js';
import userRoutes from '../routes/users.js'
import authRoutes from '../routes/auth.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/manage/user',
            auth: '/auth'
        }

        this.dbConnection();
        this.middlewares();
        this.routes();
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
    
        this.app.get('/dashboard', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/dashboard', '404.html'));
        });
        
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public', '404.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port: ', this.port);
        });
    }
}

export default Server;