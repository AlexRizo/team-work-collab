import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class Role extends Model {

}
  
Role.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        role: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'roles',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default Role;