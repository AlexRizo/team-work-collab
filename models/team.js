import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class Team extends Model { }
  
Team.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    team_name: {
    type: new DataTypes.STRING(255),
    allowNull: false,
    },
    color: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    img: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
},
{
    tableName: 'teams',
    sequelize, // passing the `sequelize` instance is required
},
);

export default Team;