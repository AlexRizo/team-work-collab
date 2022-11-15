import { validateJWT } from '../helpers/jwt.js';
import EventType from '../models/event-type.js';
import Event from '../models/event.js';
import Team from '../models/team.js';
import User from '../models/user.js';

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
    const user = req.user;
    const event = await Event.findByPk(eid, 
        { 
            include: [
                Team,
                User,
                EventType
            ], 
            attributes: [
                'id',
                'title',
                'start',
                'end',
                'description',
                'time',
                'location',
                'result',
                'color',
                'teamId'
            ]
        });

    if (!user) {
        return res.status(401).json({ error: 'Error.' });
    }
    
    if (!event) {
        return res.status(404).json({ error: 'El evento no existe.' });
    }

    if (user.role === 'ADMIN_ROLE') {
        return res.json({ event });
    }
        
    if (user.teamId != event.teamId) {
        return res.status(401).json({ error: 'Ha ocurrido un error.' });
    }
    
    res.json({ event });
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