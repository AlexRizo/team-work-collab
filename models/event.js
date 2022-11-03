import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

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
        date: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        type: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
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
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'events',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default Event;