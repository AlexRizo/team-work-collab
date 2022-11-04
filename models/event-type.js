import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class EventType extends Model {

}
  
EventType.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'event_types',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default EventType;