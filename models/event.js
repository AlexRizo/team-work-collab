import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import EventType from './event-type.js';
import Team from './team.js';
import User from './user.js';

class Event extends Model {

}
  
Event.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        start: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        end: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        eventTypeId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        time: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        location: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        result: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        teamId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'events',
        sequelize, // passing the `sequelize` instance is required
    }
);

EventType.hasOne(Event);
Event.belongsTo(EventType);

Team.hasMany(Event, { foreignKey: 'teamId', as: 'team'});
Event.belongsTo(Team);

User.hasMany(Event, { foreignKey: 'userId', as: 'user'});
Event.belongsTo(User);

export default Event;