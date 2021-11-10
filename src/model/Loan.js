const DataTypes = require('sequelize');
const database = require('../database');
const User = require('./User');

const Loan = database.define('loan',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    //freezeTableName: true
})

Loan.belongsTo(User,{
    constraint: true,
    foreignKey: 'user_id'
})

module.exports = Loan;