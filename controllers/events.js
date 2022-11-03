import { validateJWT } from '../helpers/jwt.js';

export const newEvent = async(req, res) => {
    
    res.render('events', {})
}

export const createEvent = async(req, res) => {
    const { id, status } = await validateJWT(req.header('tkn'));

    console.log(id, status);
    
    const data = req.body;

    console.log(data);

    res.json({ data })
}