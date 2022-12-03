import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import Comment from './comment.js';
import Event from './event.js';
import User from './user.js';

class CommentImage extends Model {}
  
CommentImage.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        commentId: {
            type: DataTypes.INTEGER,
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
        tableName: 'comm_images',
        sequelize, // passing the `sequelize` instance is required
    }
);

Comment.hasMany(CommentImage, { foreignKey: 'commentId'});
CommentImage.belongsTo(Comment);

User.hasMany(CommentImage, { foreignKey: 'userId'});
CommentImage.belongsTo(User);

Event.hasMany(CommentImage, { foreignKey: 'eventId'});
CommentImage.belongsTo(Event);

export default CommentImage;