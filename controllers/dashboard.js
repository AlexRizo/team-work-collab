import User from "../models/user.js";
import path from "path";
import {fileURLToPath, URL} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const authVerify = async(req, res) => {
    res.render('layout');
}