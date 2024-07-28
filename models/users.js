const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const { CompanyUsers } = require('./companies');

const User = sequelize.define('user', {
    id : {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
//This are the associations
User.hasMany(CompanyUsers, {foreignKey: 'user_id'})
CompanyUsers.belongsTo(User, {foreignKey: 'user_id'})

module.exports = User;