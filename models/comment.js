import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import User from './user.js';

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
        fileIncluded: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    },
    {
        tableName: 'comments',
        sequelize, // passing the `sequelize` instance is required
    }
);

User.hasMany(Comment, { foreignKey: 'userId'});
Comment.belongsTo(User);

export default Comment;