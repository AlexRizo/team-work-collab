import Team from "../models/team.js";

export const createTeam = (req, res) => {
    const { team_name } = req.body;
    
    const team = Team.create({ team_name });

    res.json({ 
        msg: 'Equipo creado correctamente.', 
        team 
    });
}