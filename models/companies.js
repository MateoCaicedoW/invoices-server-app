const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const Company = sequelize.define('company', {
    id : {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

const CompanyUsers = sequelize.define('company_users', {
    id : {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    
    company_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

//This are the associations
Company.hasMany(CompanyUsers, {foreignKey: 'company_id'})
CompanyUsers.belongsTo(Company, {foreignKey: 'company_id'})


module.exports = {
    Company,
    CompanyUsers
};