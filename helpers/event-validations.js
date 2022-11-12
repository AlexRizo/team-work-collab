import { request, response } from "express";
import Event from "../models/event.js";

export const event = async(req, res) => {
    const { eid } = req.params;
    const user = req.user;
    
    const event = await Event.findByPk(eid);

    if (user.role === 'ADMIN_ROLE') {
        return true;
    }
    
    if (user.teamId != event.teamId) {
        throw new Error('Petición no autorizada.')
    }
}

export const eventBelongsTo = async(req = request, res = response) => {
    const { eid } = req.params;
    const user = req.user;

    const event = await Event.findByPk(eid);

    if (user.id != event.userId) {
        throw new Error('Petición no autorizada.');
    }

    return console.log(`<--------${ user.name } | ${ event.title }------->`);
}