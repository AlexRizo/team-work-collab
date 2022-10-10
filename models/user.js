import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connection.js';
import Team from './team.js';

class User extends Model {
    // name;
    // email;
    // password;
    // role;
    // status;
}
  
User.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    },
    email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    },
    password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    },
    role: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    },
    status: {
    type: new DataTypes.BOOLEAN,
    allowNull: false,
    },
    teamId: { 
        type: DataTypes.BIGINT(11), 
        field: 'teamId',
        unique: false, 
        references: {
          model: 'Team',
          key: 'id'
        },
    }
},
{
    tableName: 'users',
    sequelize, // passing the `sequelize` instance is required
},
);

Team.hasMany(User, { foreignKey:'teamId', targetKey:'id', as:'Team' });
User.belongsTo(Team);

export default User;