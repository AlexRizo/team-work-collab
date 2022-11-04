import { validateJWT } from '../helpers/jwt.js';
import Event from '../models/event.js';

export const newEvent = async(req, res) => {
    
    res.render('events', {})
}

export const getEvents = async(req, res) => {
    res.json({msg: 'events...'})
}

export const createEvent = async(req, res) => {
    const { id, status, Team } = await validateJWT(req.header('tkn'));
    
    if (!status) {
        return res.status(400);
    }

    const { type, ...data } = req.body;

    data.teamId = Team.id;
    data.userId = id;
    data.typeId = parseInt(type);
    
    try {
        await Event.create(data);

        return res.json({msg: 'Tarea creada exitosamente.'});
    } catch (error) {
        return res.status(500).json({error});
    }
}