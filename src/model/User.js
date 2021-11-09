const DataTypes = require('sequelize');
const database = require('../database');

const User = database.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: DataTypes.DATEONLY,
    freezeTableName: true
})

module.exports = User;