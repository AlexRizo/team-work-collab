import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class Comment extends Model {

}
  
Comment.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'comments',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default Comment;