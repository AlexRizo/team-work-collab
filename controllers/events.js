import { validateJWT } from '../helpers/jwt.js';
import Event from '../models/event.js';

export const newEvent = async(req, res) => {
    
    res.render('events', {})
}

export const getEvents = async(req, res) => {
    let events;
    
    const user = req.user;
    const team = req.team;

    console.log(user.role);
    
    if (user.role != 'ADMIN_ROLE' && user.role != 'DESIGNER_ROLE') {
        events = await Event.findAll({where: { teamId: team.id }});
        return res.json(events);
    }
    
    events = await Event.findAll();

    res.json(events);
}

export const getEvent = async(req, res) => {
    const { eid } = req.params;

    
    
    res.json({
        msg: 'event',
        eid
    });
}


export const eventPage = async(req, res) => {
    res.render('event');
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