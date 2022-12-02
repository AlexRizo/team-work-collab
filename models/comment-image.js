import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import Comment from './comment.js';

class CommentImage extends Model {}
  
CommentImage.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'comment_images',
        sequelize, // passing the `sequelize` instance is required
    }
);

Comment.hasMany(CommentImage, { foreignKey: 'commentId'});
CommentImage.belongsTo(Comment);

export default CommentImage;